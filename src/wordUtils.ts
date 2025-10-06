import wordDist from "./WordLists/wordDist.csv?raw";
import startWords from "./WordLists/startWords.csv?raw";
import testStartWords from "./WordLists/testStartWords.csv?raw";
import wordFrequency from "./WordLists/wordFrequency.csv?raw";
import {daysSinceEpoch} from "./timeUtils.ts";

type WordTreeLevel = {
    [word: string]: string[]
}

type WordTree = WordTreeLevel[]

const wordDistDict: {[word: string]: number} = {}
wordDist.toLowerCase().split("\n").forEach((line) => {
    const [word, dist] = line.split(",")
    wordDistDict[word] = parseInt(dist)
})

const wordFrequencyDict: {[word: string]: number} = {}
wordFrequency.toLowerCase().split("\n").forEach((line) => {
    const [word, frequency] = line.split(",")
    wordFrequencyDict[word] = parseInt(frequency)
})

const allWords: Set<string> = new Set()
wordDist.toLowerCase().split("\n").forEach(str => allWords.add(str.trim().split(",")[0].trim()))

export function getWords() {
    return allWords
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
    return wordDistDict[word] ?? -1
}

export function isInWordList(word: string) {
    return getWords().has(word.toLowerCase())
}

export function isValidWord(word: string, prevWord: string) {
    return (
        getWords().has(word.toLowerCase()) &&
        word.length === 4 &&
        oneLetterDifferent(word, prevWord)
    )
}

export function getStartWord(index?: number) {
    function pickWord(arr: string[]) {
        const ind = index ?? daysSinceEpoch()
        return arr[ind];
    }

    return pickWord(
        startWords
            .toLowerCase()
            .split("\n")
            .map(
                (line) => line.split(",")[0]
            )
    )
}

export function getTestStartWord(index: number) {
    return (
        testStartWords
            .toLowerCase()
            .split("\n")
            .map(
                (line) => line.split(",")[0]
            )[index]
    )
}

function getAdjacentWords(word: string) {
    const adjacent: string[] = []

    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < 26; j++) {
            const letter = String.fromCharCode('a'.charCodeAt(0) + j)
            if (word[i].toLowerCase() === letter) {
                continue
            }

            const newWord = word.slice(0, i) + letter + word.slice(i + 1)
            if (getWords().has(newWord)) {
                adjacent.push(newWord.toLowerCase())
            }
        }
    }

    return adjacent
}

export function buildTree(start: string): WordTree {
    const dist = getDist(start)

    const tree: WordTree = [{"poop": []}]

    // build tree up from poop
    for (let i = 0; i < dist - 1; i++) {
        tree.push({})
        for (const word in tree[i]) {
            for (const adjWord of getAdjacentWords(word)) {
                if (getDist(adjWord) === i + 1) {
                    if (tree[i + 1][adjWord] !== undefined) {
                        tree[i + 1][adjWord].push(word)
                    } else {
                        tree[i + 1][adjWord] = [word]
                    }
                }
            }
        }
    }

    // we can stop early and do the top level specially, since we know it will be the start word alone
    tree.push({})
    tree[dist][start] = []
    for (const word in tree[dist - 1]) {
        if (oneLetterDifferent(word, start)) {
            tree[dist][start].push(word)
        }
    }

    // prune tree down from start word
    for (let i = dist - 1; i > 0; i--) {
        for (const word in tree[i]) {
            let foundAbove = false
            for (const above in tree[i + 1]) {
                if (tree[i + 1][above].includes(word)) {
                    foundAbove = true
                    break
                }
            }
            if (!foundAbove) {
                delete tree[i][word]
            }
        }
    }

    return tree
}

type TreeTraversal = {path: string[], goodness: number}

function getBestTraversal(tree: WordTree, level: number, root: string): TreeTraversal {
    if (level <= 0) {
        return {path: ["poop"], goodness: getLogFrequency("poop")}
    } else {
        const pathsFromHere = tree[level][root].map(word => getBestTraversal(tree, level - 1, word))
        let bestPathFromHere: TreeTraversal | null = null
        let bestGoodness = -99999999999
        for (const path of pathsFromHere) {
            if (path.goodness > bestGoodness) {
                bestPathFromHere = path
                bestGoodness = path.goodness
            }
        }

        return {path: [root, ...(bestPathFromHere?.path || [])], goodness: bestGoodness + getLogFrequency(root)}
    }
}

export function getTreeWidth(start: string): number {
    const tree = buildTree(start)

    return tree.map(level => Object.keys(level).length).reduce((a, b) => Math.max(a, b))
}

export function getLogFrequency(word: string): number {
    return Math.log(wordFrequencyDict[word])
}

export function getShortestPath(start: string): string[] {
    const tree = buildTree(start)
    return getBestTraversal(tree, tree.length - 1, start).path
}