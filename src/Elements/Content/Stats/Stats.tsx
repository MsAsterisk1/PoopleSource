import {Results} from "./Results";
import {Totals} from "./Totals";
import {Histogram} from "./Histogram/Histogram";
import "./Stats.css"
import {Countdown} from "./Countdown";
import {getGuesses} from "../../../localStorageUtils.ts";

type StatsProps = {
    gameWon: boolean,
    test?: boolean,
    testNext: () => void,
}

export function Stats(props: StatsProps) {

    const guesses = getGuesses()

    return (
        <div className="Stats">
            {props.gameWon ? <h1>{guesses[0]?.toUpperCase()}  <span style={{fontSize: "80%"}}>to</span>  POOP</h1> : null}
            <div className="StatsContainer">
                {props.gameWon ? <Results/> : null}
                <Totals/>
                <Histogram showHighlight={props.gameWon}/>
                {props.test ? <span className={"testNextButton"} onClick={props.testNext}>Test next puzzle</span> : (props.gameWon ? <Countdown/> : null)}

            </div>
        </div>
    );
}