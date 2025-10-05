
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
import {
    getDist,
    getStartWord,
    getTestStartWord,
    isInWordList,
    isLetter,
    isValidWord,
    oneLetterDifferent
} from "../../../wordUtils.ts";
import {isToday, isYesterday} from "../../../timeUtils.ts";
import mixpanel from "mixpanel-browser";

type GameAreaProps = {
    onGameOver?: (isOnLoad?: boolean) => void;
    test?: boolean;
    testIndex: number;
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
            if (!props.test) {
                winGame(excessGuesses)
            }
            
            if (props.onGameOver !== undefined) {
                props.onGameOver()

                if (!props.test) {
                    mixpanel.track("Finish Game")
                }
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
        if (!isToday(getTimeLastPlayed()) || getGuesses().length === 0 || getGuesses()[0] !== getStartWord()) {
            mixpanel.track("Start Game")
            setGuesses([getStartWord()]);
            setCurrentWord("")
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

    if (!loaded && !props.test) {
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

        if (props.test && words[0] !== getTestStartWord(props.testIndex)) {
            setGuesses([getTestStartWord(props.testIndex)])
            setWords([getTestStartWord(props.testIndex)]);
            setCurrentWord("")
        }

        return () => {
            window.removeEventListener("keydown", onKeyPressed);
        }
    }, [props.test, props.testIndex, registerKey, words]);


    return (
        <div className="GameArea">
            <RowContainer errorMessage={errorMessage} gameOver={words.at(-1)?.toLowerCase() === "poop"} invalidEntry={invalidEntry} words={words} currentWord={currentWord}/>
            <Keyboard onKeyPress={registerKey}/>
        </div>
    );
}