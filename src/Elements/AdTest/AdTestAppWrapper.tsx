import PubliftAppWrapper from "./PubliftAppWrapper.tsx";
import EzoicAppWrapper from "./EzoicAppWrapper.tsx";

export default function AdTestAppWrapper(props: {test?: boolean}) {
    console.log("Getting provider from React: " + sessionStorage.getItem("adProvider"))

    return (
            sessionStorage.getItem("adProvider") === "ezoic" ?
                <EzoicAppWrapper test={props.test} /> :
                <PubliftAppWrapper test={props.test} />
    )
}