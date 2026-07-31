import {useCallback, useEffect, useState} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Stats} from "./Content/Stats/Stats";
import {Intro} from "./Content/Intro/Intro";
import {GameArea} from "./Content/Gameplay/GameArea";
import {Modal} from "./Content/Modal";
import {getGuesses, getTimeLastWon} from "../localStorageUtils.ts";
import {getDist, getStartWord} from "../wordUtils.ts";
import {EmojiRain} from "./Content/Gameplay/EmojiRain.tsx";
import {useNavigate, useSearchParams} from "react-router";
import Yesterday from "./Content/Yesterday/Yesterday.tsx";
import {daysSinceEpoch} from "../timeUtils.ts";
import {Advertisement} from "./Content/Advertising/Advertisement.tsx";

function App(props: {test?: boolean}) {
    const [showStats, setShowStats] = useState(false)
    const [showIntro, setShowIntro] = useState(false)
    const [showYesterday, setShowYesterday] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [showEmojiRain, setShowEmojiRain] = useState(false)
    const [perfect, setPerfect] = useState(false)
    const [testIndex, setTestIndex] = useState(-1)

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [showIntroFirstTime, setShowIntroFirstTime] = useState(true)

    if (getTimeLastWon() === undefined) {
        if (showIntroFirstTime) {
            setShowIntroFirstTime(false)
            setShowIntro(true)
        }
    }

    useEffect(() => {
        const fusetag = (window as unknown as Window & {
            fusetag: {
                que: (() => void)[]
                registerZone: ((id: string) => void)
            }
        }).fusetag
        fusetag.que.push(function() {
            fusetag.registerZone('leaderboard-ad')
            fusetag.registerZone('rhs-ad')
            fusetag.registerZone('lhs-ad')
        });
    }, []);

    useEffect(() => {
        setTestIndex(parseInt(searchParams.get("index") ?? "-1"))
    }, [searchParams, testIndex])

    const onGameOver = useCallback((isOnLoad?: boolean) => {
        setGameWon(true)
        setPerfect(getGuesses().length - 1 === getDist(getGuesses()[0]))
        setTimeout(() => {
            setShowStats(true)
        }, isOnLoad ? 500 : 2000)

        if (!isOnLoad) {
            setShowEmojiRain(true)
        }
    }, []);

    function testNext() {
        setTestIndex(testIndex + 1)
        navigate(`/test?index=${testIndex + 1}`)
        setShowStats(false)
    }

    return (
        <div className="App">
            <Header/>

            <GameArea testIndex={testIndex} test={props.test} onGameOver={onGameOver}/>
            <EmojiRain active={showEmojiRain} count={100}/>

            {props.test ? (
                <>
                    <Advertisement area={"leaderboard"}>
                        <div id={"leaderboard-ad"} data-fuse="mobile_leaderboard"></div>
                    </Advertisement>

                    <Advertisement area={"left"}>
                        <div id={"lhs-ad"} data-fuse="vrec_lhs"></div>
                    </Advertisement>

                    <Advertisement area={"right"}>
                        <div id={"rhs-ad"} data-fuse="vrec_rhs"></div>
                    </Advertisement>
                </>
            ) : <div></div>
            }


            <Modal hidden={!showStats} title={gameWon ? (perfect ? "Perfect!" : "Congratulations!") : ""} onClosePress={() => setShowStats(false)}>
                <Stats test={props.test} testNext={testNext} gameWon={gameWon}/>
            </Modal>

            <Modal hidden={!showIntro} title={"How to play Poople"} onClosePress={() => setShowIntro(false)}>
                <Intro onClosePress={() => setShowIntro(false)}/>
            </Modal>

            <Modal hidden={!showYesterday} title={`Poople #${daysSinceEpoch() - 1}: ${getStartWord(daysSinceEpoch() - 1).toUpperCase()}`} onClosePress={() => setShowYesterday(false)}>
                <Yesterday/>
            </Modal>

            <Footer setShowYesterday={setShowYesterday} setShowStats={setShowStats} setShowIntro={setShowIntro}/>
        </div>
    );
}

export default App;
