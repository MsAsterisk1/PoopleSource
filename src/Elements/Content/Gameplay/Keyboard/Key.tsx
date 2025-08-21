import "./Key.css"

type KeyProps = {
    cap: string;
    id?: string;
    onClick?: () => void;
}

export function Key(props: KeyProps) {
    return (
        <div onClick={props.onClick} className="Key" id={props.id}>
            {props.cap}
        </div>
    );
}