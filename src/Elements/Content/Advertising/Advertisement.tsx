import "./Advertisement.css";
import type {PropsWithChildren} from "react";

type AdvertisementProps = {
    area: string,
}

export function Advertisement(props: AdvertisementProps & PropsWithChildren) {
    return (
        <div className={"Advertisement " + props.area}>
            {/*<Adsense*/}
            {/*    className="AdSlot"*/}
            {/*    client='ca-pub-6800605752023635'*/}
            {/*    slot="5466665549"*/}
            {/*    // format="auto"*/}
            {/*    // responsive="true"*/}
            {/*    // adTest='on'*/}
            {/*/>*/}
            {props.children}
        </div>
    );
}