import {HistogramBar} from "./HistogramBar";

import "./Histogram.css"
import type {ReactElement} from "react";
import {getGames, getGuesses} from "../../../../localStorageUtils.ts";
import {getDist} from "../../../../wordUtils.ts";

type HistogramProps = {
    showHighlight: boolean
}

export function Histogram(props: HistogramProps) {

    const numBuckets = 7

    const games = getGames()
    const data: number[] = []
    let highBucketTotal = 0
    for (const gamesKey in games) {
        if (parseInt(gamesKey) < numBuckets - 1) {
            data[parseInt(gamesKey)] = games[gamesKey]
        } else {
            highBucketTotal += games[gamesKey]
        }
    }
    data[numBuckets - 1] = highBucketTotal

    function total(arr: number[]) {
        return arr.reduce((a, b) => a + b, 0);
    }

    const guesses: string[] = getGuesses()
    const shortestDist = getDist(guesses[0] ?? "")

    const bars: ReactElement[] = []

    for (let i = 0; i < numBuckets; i++) {
        bars.push(
            <HistogramBar
                key={i}
                label={i + (i === numBuckets - 1 ? "+" : "")}
                value={data[i] ?? 0}
                total={total(data)}
                highlight={
                    props.showHighlight && (
                        (guesses.length - 1) - shortestDist === i ||
                        (i === numBuckets - 1 && ((guesses.length - 1) - shortestDist >= i))
                    )
                }
            />
        )
    }

    return (
        <div className="Histogram">
            <b>Distribution:</b>
            <p className="HistogramAxisLabel">Extra guesses</p>
            {bars}
        </div>
    );
}