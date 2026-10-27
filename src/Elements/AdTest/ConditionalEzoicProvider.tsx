import React from "react";
import {EzoicProvider} from "@ezoic/react-sdk";

export default function ConditionalEzoicProvider(props: {active: boolean, children: React.ReactNode}) {
    return (
        props.active ?
            <EzoicProvider consent={"third-party"}> {props.children} </EzoicProvider> :
            props.children
    )
}