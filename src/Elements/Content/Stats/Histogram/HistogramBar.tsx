import "./HistogramBar.css"

type HistogramBarProps = {
    label: string,
    value: number,
    total: number,
    highlight?: boolean,
}

export function HistogramBar(props: HistogramBarProps) {
    return (
        <div className="HistogramBar">
            <div className="HistogramBarLabel">{props.label}</div>
            <div className="HistogramBarAreaContainer">
                <div
                    style={{width: `${100 * (props.value ?? 0) / props.total}%`}}
                    className={"HistogramBarArea" + (props.highlight ? " highlight" : "")}
                >
                    {props.value ?? 0}
                </div>
            </div>
        </div>
    );
}