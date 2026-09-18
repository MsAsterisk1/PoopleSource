import React from "react";
import {EzoicProvider} from "@ezoic/react-sdk";

export default function ConditionalEzoicProvider(props: {active: boolean, children: React.ReactNode}) {
    return (
        props.active ?
            <EzoicProvider> {props.children} </EzoicProvider> :
            props.children
    )
}