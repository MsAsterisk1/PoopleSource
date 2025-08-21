import {useCallback, useState} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Stats} from "./Content/Stats/Stats";
import {Intro} from "./Content/Intro/Intro";
import {Advertisement} from "./Content/Advertising/Advertisement";
import {GameArea} from "./Content/Gameplay/GameArea";
import {Modal} from "./Content/Modal";
import {getGuesses, getTimeLastWon} from "../localStorageUtils.ts";
import {getDist} from "../wordUtils.ts";
import {EmojiRain} from "./Content/Gameplay/EmojiRain.tsx";

function App() {
    const [showStats, setShowStats] = useState(false)
    const [showIntro, setShowIntro] = useState(false)
    const [gameWon, setGameWon] = useState(false)
    const [showEmojiRain, setShowEmojiRain] = useState(false)
    const [perfect, setPerfect] = useState(false)

    const [showIntroFirstTime, setShowIntroFirstTime] = useState(true)

    if (getTimeLastWon() === undefined) {
        if (showIntroFirstTime) {
            setShowIntroFirstTime(false)
            setShowIntro(true)
        }
    }


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

    return (
        <div className="App">
            <Header/>

            <Advertisement/>
            <GameArea onGameOver={onGameOver}/>
            <EmojiRain active={showEmojiRain} count={100}/>
            <Advertisement/>

            <Modal hidden={!showStats} title={gameWon ? (perfect ? "Perfect!" : "Congratulations!") : ""} onClosePress={() => setShowStats(false)}>
                <Stats gameWon={gameWon}/>
            </Modal>

            <Modal hidden={!showIntro} title={"How to play Poople"} onClosePress={() => setShowIntro(false)}>
                <Intro onClosePress={() => setShowIntro(false)}/>
            </Modal>

            <Footer setShowStats={setShowStats} setShowIntro={setShowIntro}/>
        </div>
    );
}

export default App;
