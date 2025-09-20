import { Adsense } from '@ctrl/react-adsense';
import "./Advertisement.css";

type AdvertisementProps = {
    area: string,
}

export function Advertisement(props: AdvertisementProps) {
    return (
        <div className={"Advertisement " + props.area}>
            <Adsense
                className="AdSlot"
                client='ca-pub-6800605752023635'
                slot="5466665549"
                // format="auto"
                // responsive="true"
                // adTest='on'
            />
        </div>
    );
}