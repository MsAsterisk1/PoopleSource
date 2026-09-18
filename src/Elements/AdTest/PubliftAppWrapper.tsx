import App from "../App.tsx";

export default function PubliftAppWrapper(props: {test?: boolean}) {
    return (
        <App test={props.test} adProvider={"publift"}/>
    )
}