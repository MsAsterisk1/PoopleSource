import "./Totals.css"
import {getBestStreak, getGames, getStreak} from "../../../localStorageUtils.ts";

export function Totals() {
    let wins = 0
    let avgExtra = 0
    for (const entry in getGames()) {
        wins += getGames()[entry]
        avgExtra += getGames()[entry] * parseInt(entry)
    }
    if (wins > 0) {
        avgExtra = avgExtra / wins
    } else {
        avgExtra = 0
    }

    return (
        <div className="Totals">
            <b>Stats:</b>
            <div className={"Entries"}>
                <div className={"Entry"}>
                    <h2>{wins}</h2>
                    <p>Wins</p>
                </div>
                <div className={"Entry"}>
                    <h2>{avgExtra.toFixed(2)}</h2>
                    <p>Avg. Extra Guesses</p>
                </div>
                <div className={"Entry"}>
                    <h2>{getStreak()}</h2>
                    <p>Current Streak</p>
                </div>
                <div className={"Entry"}>
                    <h2>{getBestStreak()}</h2>
                    <p>Best Streak</p>
                </div>
            </div>
        </div>
    );
}