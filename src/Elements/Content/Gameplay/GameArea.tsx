
import "./GameArea.css"
import {useCallback, useEffect, useState} from "react";
import {RowContainer} from "./Board/RowContainer";
import {Keyboard} from "./Keyboard/Keyboard";
import {
    winGame,
    getGuesses,
    getTimeLastPlayed,
    getTimeLastWon,
    setGuesses, setStreak,
    setTimeLastPlayed
} from "../../../localStorageUtils.ts";
import {getDist, getStartWord, isInWordList, isLetter, isValidWord, oneLetterDifferent} from "../../../wordUtils.ts";
import {isToday, isYesterday} from "../../../timeUtils.ts";

type GameAreaProps = {
    onGameOver?: (isOnLoad?: boolean) => void;
}

export function GameArea(props: GameAreaProps) {
    const [words, setWords] = useState<string[]>([])
    const [currentWord, setCurrentWord] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [invalidEntry, setInvalidEntry] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const makeGuess = useCallback((word: string) => {
        setGuesses([...words, word]);

        setWords([...words, word])
        if (word.toLowerCase() === "poop") {

            const guesses = getGuesses()
            const shortestDist = getDist(words[0])
            const excessGuesses = guesses.length - 1 - shortestDist
            winGame(excessGuesses)
            
            if (props.onGameOver !== undefined) {
                props.onGameOver()
            }
        }
    }, [props, words])

    const handleEnter = useCallback(() => {
        if (isValidWord(currentWord, words.at(-1) ?? "")) {
            makeGuess(currentWord)
        } else {
            if (currentWord.length !== 4) {
                setErrorMessage("")
            } else if (!isInWordList(currentWord)) {
                setErrorMessage("Not in word list")
            } else if (!oneLetterDifferent(currentWord, words.at(-1) ?? "")) {
                setErrorMessage("Not one letter different")
            } else {
                setErrorMessage("")
            }

            setInvalidEntry(true)
            setTimeout(() => setInvalidEntry(false), 1000)
        }
        if (currentWord.length === 4) {
            setCurrentWord("");
        }
    }, [currentWord, makeGuess, words])

    const registerKey = useCallback((key: string) => {
        if (isLetter(key) && currentWord.length < 4) {
            setCurrentWord(currentWord.concat(key))
        } else if (key === "Enter") {
            handleEnter()
        } else if (key === "Backspace" && currentWord.length > 0) {
            setCurrentWord(currentWord.substring(0, currentWord.length - 1));
        }

        document.getElementById("ScrollContainer")?.scrollTo({
            top: document.getElementById("ScrollContainer")?.scrollHeight,
            behavior: 'smooth'
        });
    }, [currentWord, handleEnter])

    function onload() {
        if (!isToday(getTimeLastPlayed()) || getGuesses().length === 0) {
            setGuesses([getStartWord()]);
        }

        if (!isYesterday(getTimeLastWon()) && !isToday(getTimeLastWon())) {
            setStreak(0)
        }

        setTimeLastPlayed()

        const storedWords: string[] = getGuesses()
        setWords(storedWords);

        if (storedWords.at(-1)?.toLowerCase() === "poop") {
            if (props.onGameOver) {
                props.onGameOver(true)
            }
        }
    }

    if (!loaded) {
        setLoaded(true)
        onload()
    }
    
    useEffect(() => {
        function onKeyPressed(event: KeyboardEvent) {
            registerKey(event.key)
        }
        
        window.addEventListener("keydown", onKeyPressed);

        document.getElementById("ScrollContainer")?.scrollTo({
            top: document.getElementById("ScrollContainer")?.scrollHeight,
            behavior: "smooth"
        });

        return () => {
            window.removeEventListener("keydown", onKeyPressed);
        }
    }, [registerKey])


    return (
        <div className="GameArea">
            <RowContainer errorMessage={errorMessage} gameOver={words.at(-1)?.toLowerCase() === "poop"} invalidEntry={invalidEntry} words={words} currentWord={currentWord}/>
            <Keyboard onKeyPress={registerKey}/>
        </div>
    );
}