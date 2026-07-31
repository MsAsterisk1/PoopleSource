import {getDist, getShortestPath, getStartWord, getTreeWidth} from "../../../wordUtils.ts";
import {daysSinceEpoch} from "../../../timeUtils.ts";
import "./Yesterday.css";
import {Row} from "../Gameplay/Board/Row.tsx";

export default function Yesterday() {

    const yesterdayStartWord = getStartWord(daysSinceEpoch() - 1)
    const width = getTreeWidth(yesterdayStartWord);
    const path = getShortestPath(yesterdayStartWord);
    const dist = getDist(yesterdayStartWord);

    const widthQuanitifier = width == 1 ? "was only one way" : (width < 5 ? "were a few ways" : "were several ways")

    const presentingSentence = width == 1 ? "Here it is:" : "Here's one of them:"

    return (
        <div className={"Yesterday"}>

            <p>The shortest path yesterday was {dist} guesses,
                and there {widthQuanitifier} to get there! {presentingSentence}</p>

            <div className={"row-container"}>
                {path.map(word => <Row word={word} key={word}/>)}
            </div>

        </div>
    )
}