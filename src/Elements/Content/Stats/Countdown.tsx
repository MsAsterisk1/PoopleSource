import {getFormattedTimeToMidnight, isToday} from "../../../timeUtils.ts";
import {useEffect, useState} from "react";
import {getTimeLastPlayed} from "../../../localStorageUtils.ts";
import "./Countdown.css"

export function Countdown() {
    const [time, setTime] = useState(getFormattedTimeToMidnight())
    const [newGameReady, setNewGameReady] = useState(false);

    function reload() {
        window.location.reload()
    }

    useEffect(() => {
        let countdown: number
        setTimeout(() => {
            setNewGameReady(!isToday(getTimeLastPlayed()));
            countdown = setInterval(() => {
                if (!isToday(getTimeLastPlayed())) {
                    setNewGameReady(true);
                    clearInterval(countdown)
                } else {
                    setTime(getFormattedTimeToMidnight())
                }
            }, 1000)
        }, 10)

        return () => clearInterval(countdown)
    }, [newGameReady])

    return (
        <div className="Countdown">
            {newGameReady ? <span className={"clickable"} onClick={() => reload()}>Click here to play today's puzzle!</span> : <>Play again in <b>{time}</b></>}
        </div>
    );
}