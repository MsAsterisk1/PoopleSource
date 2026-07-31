import "./Results.css"
import {getGuesses, getTimeLastPlayed} from "../../../localStorageUtils.ts";
import {getDist} from "../../../wordUtils.ts";
import {useState} from "react";
import {daysSinceEpoch} from "../../../timeUtils.ts";

export function Results() {

    const [showCopyFeedback, setShowCopyFeedback] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
    
    const guesses = getGuesses();
    const shortestDist = getDist(guesses[0] ?? "")

    async function copyResults() {
        let resultsString = `Poople #${daysSinceEpoch(getTimeLastPlayed())} ${guesses.length - 1}/${shortestDist}\n`

        for (const guess of guesses) {
            for (let i = 0; i < 4; i++) {
                if (guess.toLowerCase()[i] === "poop"[i]) {
                    resultsString += "🟫"
                } else {
                    resultsString += "⬜"
                }
            }
            resultsString += "\n"

        }

        resultsString += "\nhttps://poople.io/"
        
        try {
            await navigator.clipboard.writeText(resultsString)
            setShowCopyFeedback(true)
            setCopySuccess(true)
            setTimeout(() => { setShowCopyFeedback(false) }, 1000)
        } catch (error) {
            console.error(error)
            setShowCopyFeedback(true)
            setCopySuccess(false)
            setTimeout(() => { setShowCopyFeedback(false) }, 1000)
        }
        
    }

    return (
        <div className="Results">
            You used <b>{guesses.length - 1} guesses.</b><br/>
            The best solution was <b>{shortestDist} guesses.</b><br/>
            <span onClick={() => copyResults()} className={"linkStyle"}>Copy results</span>
            <span className={"ResultsCopyFeedback" + (showCopyFeedback ? " show" : "") + (copySuccess ? " success" : " error")}></span>
        </div>
    );
}