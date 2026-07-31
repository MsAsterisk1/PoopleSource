import "./Advertisement.css";
import type {PropsWithChildren} from "react";

type AdvertisementProps = {
    area: string,
}

export function Advertisement(props: AdvertisementProps & PropsWithChildren) {
    return (
        <div className={"Advertisement " + props.area}>
            {props.children}
        </div>
    );
}