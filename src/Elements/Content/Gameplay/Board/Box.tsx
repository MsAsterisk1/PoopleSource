import "./Box.css"

type BoxProps = {
    letter?: string;
    highlight?: boolean;
}

export function Box(props: BoxProps) {
    return (
        <div className={"Box" + (props.highlight ? " highlight" : "")}>
            {props.letter?.toUpperCase() ?? ""}
        </div>
    );
}