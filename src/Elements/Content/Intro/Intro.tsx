import example from "./1letterDiffExample.png"
import "./Intro.css"

type IntroProps = {
    onClosePress: () => void,
}

export function Intro(props: IntroProps) {
    return (
        <div className="Intro">

            <p><b>Get to "POOP" in as few steps as possible</b></p>
            <p>Each word must be exactly one letter different from the last:</p>
            <img src={example}
                 alt={`The words "barn" and "born", highlighting the one letter where they differ`}/>
            <p>A random starting word is chosen daily. Can you find the shortest path?</p>
            <button className={"IntroPlayButton"} onClick={props.onClosePress}>Click here to play!</button>

        </div>
    );
}