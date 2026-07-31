import logo from "./Poople.svg"
import "./header.css"
import {daysSinceEpoch} from "../../timeUtils.ts";
import {getStartWord} from "../../wordUtils.ts";

export function Header() {
    return (
        <div className="Header">
            <div className="title">
                <h1>Poople</h1>
                <img src={logo} alt={"💩"}/>
            </div>
            <span className={"subheader"}>#{daysSinceEpoch()}: {getStartWord().toUpperCase()}</span>
            <hr/>
        </div>
    );
}