import "./Footer.css"

type FooterProps = {
    setShowYesterday: (showYesterday: boolean) => void;
    setShowStats: (showStats: boolean) => void;
    setShowIntro: (showIntro: boolean) => void;
}

export function Footer(props: FooterProps) {
    return (
        <div className="Footer">
            <p onClick={() => props.setShowYesterday(true)}>Yesterday's answer</p>
            <p onClick={() => props.setShowStats(true)}>Show stats</p>
            <p onClick={() => props.setShowIntro(true)}>How to play</p>
        </div>
    );
}