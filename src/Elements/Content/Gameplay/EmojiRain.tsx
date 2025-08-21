import "./EmojiRain.css"
import {type ReactElement, useState} from "react";

type EmojiRainProps = {
    count: number,
    active?: boolean,
}

export function EmojiRain(props: EmojiRainProps) {
    const emojis: ReactElement[] = []

    const [initialized, setInitialized] = useState(false)
    const [positions, setPositions] = useState<number[]>([])
    const [rotations, setRotations] = useState<number[]>([])
    const [delays, setDelays] = useState<number[]>([])
    const [durations, setDurations] = useState<number[]>([])


    function randomizeEmojis() {
        const pos: number[] = []
        const rot: number[] = []
        const del: number[] = []
        const dur: number[] = []
        for (let i = 0; i < props.count; i++) {
            pos.push(Math.random() * 100)
            rot.push(Math.random() * 30 - 15)
            del.push(Math.random() * 3000)
            dur.push(Math.random() * 1000 + 2500)
        }
        setPositions(pos)
        setRotations(rot)
        setDelays(del)
        setDurations(dur)
    }

    if (!initialized) {
        setInitialized(true)
        randomizeEmojis()
    }
    
    if (props.active) {
        for (let i = 0; i < props.count; i++) {
            emojis[i] = <div
                style={{
                    left: `${positions[i]}%`,
                    animationDelay: `${delays[i]}ms`,
                    animationDuration: `${durations[i]}ms`,
                    rotate: `${rotations[i]}deg`,
                }}
                className="EmojiRaindrop"
                key={i}
            >
                💩
            </div>
        }
    }

    return (
        <div className="EmojiRain">
            {emojis}
        </div>
    );
}