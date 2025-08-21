import {Row} from "./Row";
import "./RowContainer.css"

type RowContainerProps = {
    words: string[];
    gameOver?: boolean;
    currentWord: string;
    invalidEntry?: boolean;
}

export function RowContainer(props: RowContainerProps) {

    function WordToRow(word: string, index?: number) {
        return <Row word={word} key={index} />;
    }

    function MakeRows() {
        return [
            ...props.words.map(WordToRow),
            !props.gameOver ? <Row
                wiggle={props.invalidEntry}
                suppressHighlight
                word={props.currentWord}
                id={"currentWordRow"}
                key={props.words.length}
            /> : null,
        ];
    }

    return (
        <div className={"RowContainer " + (props.gameOver ? " jump" : "")}>
            <div id={"ScrollContainer"}>
                {MakeRows()}
            </div>
        </div>
    );
}