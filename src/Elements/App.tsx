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
import mixpanel from "mixpanel-browser";
import {useNavigate, useSearchParams} from "react-router";
import Yesterday from "./Content/Yesterday/Yesterday.tsx";
import {daysSinceEpoch} from "../timeUtils.ts";

function App(props: {test?: boolean}) {
    const [showStats, setShowStats] = useState(false)
    const [showIntro, setShowIntro] = useState(false)
    const [showYesterday, setShowYesterday] = useState(true)
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

    if (!props.test) {
        mixpanel.init("e618f9d188a4bfdb14f5ffede6dce33c", {
            debug: true,
            track_pageview: true,
            persistence: "localStorage",
            record_heatmap_data: true,
            ip: false,
            property_blacklist: [
                '$city',
                '$region',
                '$country_code',
                '$geo_source',
                '$timezone',
                '$last_seen',
                '$referrer',
                '$device_id',
                '$user_id',
                '$os',
                '$os_version',
                '$browser',
                '$browser_version',
                '$device',
                '$screen_height',
                '$screen_width',
                '$screen_dpi',
                '$manufacturer',
                '$brand',
                '$model',
                '$watch_model',
                '$carrier',
                '$radio',
                '$wifi',
                '$bluetooth_enabled',
                '$bluetooth_version',
                '$has_nfc',
                '$has_telephone',
                '$google_play_services'
            ],
        });

        mixpanel.track_pageview()
    }

    function testNext() {
        setTestIndex(testIndex + 1)
        navigate(`/test?index=${testIndex + 1}`)
        setShowStats(false)
        // window.location.reload()
        // searchParams.set("index", String(parseInt(searchParams.get("index") ?? "-1") + 1))
    }

    return (
        <div className="App">
            <Header/>

            {/*<Advertisement area={"left"}>*/}

            {/*</Advertisement>*/}
            <GameArea testIndex={testIndex} test={props.test} onGameOver={onGameOver}/>
            <EmojiRain active={showEmojiRain} count={100}/>
            {/*<Advertisement area={"right"}/>*/}

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
