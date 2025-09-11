import wordDist from "./WordLists/wordDist.csv?raw";
import startWords from "./WordLists/startWords.csv?raw";
import {daysSinceEpoch} from "./timeUtils.ts";

export function getWords() {
    return wordDist.toLowerCase().split("\n").map(str => str.trim().split(",")[0].trim())
}

export function isLetter(str: string) {
    return str.length === 1 && (str.match(/[a-z]/i) !== null);
}

export function oneLetterDifferent(str0: string, str1: string) {
    if (str0.length !== str1.length) {
        return false
    }

    let differences = 0
    for (let i = 0; i < str0.length; i++) {
        if (str0.charAt(i).toLowerCase() !== str1.charAt(i).toLowerCase()) {
            differences += 1;
        }
    }
    return differences === 1
}

export function getDist(word: string) {
    let shortestDist: number = -1
    wordDist
        .split("\n")
        .map((line) => line.split(","))
        .forEach((entry) => {
            if (entry[0].toLowerCase() === word.toLowerCase()) {
                shortestDist = parseInt(entry[1])
            }
        })
    return shortestDist;
}

export function isInWordList(word: string) {
    return getWords().includes(word.toLowerCase())
}

export function isValidWord(word: string, prevWord: string) {
    return (
        getWords().includes(word.toLowerCase()) &&
        word.length === 4 &&
        oneLetterDifferent(word, prevWord)
    )
}

export function getStartWord() {
    function pickWord(arr: string[]) {
        const index = daysSinceEpoch()
        return arr[index];
    }

    return pickWord(
        startWords
            .toLowerCase()
            .split("\n")
            .filter( // only select words at non-trivial distance
                (line) => parseInt(line.split(",")[1]) > 4
            ).map(
                (line) => line.split(",")[0])
    )
}