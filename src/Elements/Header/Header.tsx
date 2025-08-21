import logo from "./Poople.svg"
import "./header.css"

export function Header() {
    return (
        <div className="Header">
            <div className="title">
                <h1>Poople</h1>
                <img src={logo} alt={"💩"}/>
            </div>
            <hr/>
        </div>
    );
}