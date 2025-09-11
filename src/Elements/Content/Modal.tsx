import type {PropsWithChildren} from "react";
import "./Modal.css"

type ModalProps = {
    title: string,
    onClosePress: () => void,
    hidden: boolean,
}

export function Modal(props: PropsWithChildren & ModalProps) {
    return (
        <div className={"Modal fade-in" + (props.hidden ? " hide" : "")}>
            <div className="ModalBackdrop" onClick={props.onClosePress}></div>
            <div className="ModalContent">
                <h1 className={"ModalTitle"}>{props.title}</h1>
                <button onClick={props.onClosePress} className="ModalCloseButton">✕</button>
                {props.children}
            </div>
        </div>
    );
}