import {Key} from "./Key";
import "./Keyboard.css"

type KeyboardProps = {
    onKeyPress: (str: string) => void;
}

export function Keyboard(props: KeyboardProps) {
    function StringToKeys(str: string) {
        return str.split("").map((item, index) => {
            return <Key onClick={() => props.onKeyPress(item)} cap={item.toUpperCase()} key={index} />
        })
    }
    
    const row0 = "qwertyuiop"
    const row1 = "asdfghjkl"
    const row2 = "zxcvbnm"
    
    return (
        <div className="Keyboard">
            <div className={"KeyboardRow"}>
                {StringToKeys(row0)}
            </div>
            <div className={"KeyboardRow"}>
                {StringToKeys(row1)}
            </div>
            <div className={"KeyboardRow"}>
                <Key onClick={() => props.onKeyPress("Enter")} cap={"Enter"} id={"enter"}/>
                {StringToKeys(row2)}
                <Key onClick={() => props.onKeyPress("Backspace")} cap={"⌫"} id={"backspace"}/>
            </div>
        </div>
    );
}