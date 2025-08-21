import {Box} from "./Box";
import "./Row.css"

type RowProps = {
    word?: string
    id?: string
    suppressHighlight?: boolean
    wiggle?: boolean
}

export function Row(props: RowProps) {

    function MakeAllBoxes(word: string) {
        const boxes = [];
        for (let i = 0; i < 4; i++) {
            boxes.push(MakeBox(word, i))
        }
        return boxes
    }

    function MakeBox(word: string, index: number) {
        const letter = word.at(index) ?? "";

        const highlight = !props.suppressHighlight && letter.toLowerCase() === "poop".at(index);

        return <Box key={index} letter={letter} highlight={highlight} />;
    }

    return (
        <div className={"Row" + (props.wiggle ? " wiggle" : "")} id={props.id}>
            {
                MakeAllBoxes(props.word ?? "")
            }
        </div>
    );
}