
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
import {getDist, getStartWord, isLetter, isValidWord} from "../../../wordUtils.ts";
import {isToday, isYesterday} from "../../../timeUtils.ts";

type GameAreaProps = {
    onGameOver?: (isOnLoad?: boolean) => void;
}

export function GameArea(props: GameAreaProps) {
    const [words, setWords] = useState<string[]>([])
    const [currentWord, setCurrentWord] = useState("")

    const [invalidEntry, setInvalidEntry] = useState(false)

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
            setInvalidEntry(true)
            setTimeout(() => setInvalidEntry(false), 500)
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

    useEffect(() => {
        function onKeyPressed(event: KeyboardEvent) {
            registerKey(event.key)
        }
        
        window.addEventListener("keydown", onKeyPressed);

        document.getElementById("ScrollContainer")?.scrollTo({
            top: document.getElementById("ScrollContainer")?.scrollHeight,
            behavior: "smooth"
        });

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

        window.addEventListener("load", onload);

        return () => {
            window.removeEventListener("keydown", onKeyPressed);
            window.removeEventListener("load", onload);
        }
    }, [props, registerKey, words])


    return (
        <div className="GameArea">
            <RowContainer gameOver={words.at(-1)?.toLowerCase() === "poop"} invalidEntry={invalidEntry} words={words} currentWord={currentWord}/>
            <Keyboard onKeyPress={registerKey}/>
        </div>
    );
}