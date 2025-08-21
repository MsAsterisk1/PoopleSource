import "./Footer.css"

type FooterProps = {
    setShowStats: (showStats: boolean) => void;
    setShowIntro: (showIntro: boolean) => void;
}

export function Footer(props: FooterProps) {
    return (
        <div className="Footer">
            <p onClick={() => props.setShowStats(true)}>Show stats</p>
            <p onClick={() => props.setShowIntro(true)}>How to play</p>
        </div>
    );
}