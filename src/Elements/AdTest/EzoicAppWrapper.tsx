import App from "../App.tsx";
import {useLocation} from "react-router";
import {config, setEzoicAnchorAd, useEzoicPageView} from "@ezoic/react-sdk";

export default function EzoicAppWrapper(props: {test?: boolean}) {
    const { pathname } = useLocation();
    useEzoicPageView(pathname, { ids: [101, 105, 104] });
    config({
        disableLeftSideRail: true, // auto gutter ad on the left, not placeholder 105
        disableRightSideRail: true, // auto gutter ad on the right, not placeholder 104
        disableSidebarFloating: true, // sticky sidebar that follows scroll
        disableInterstitial: true, // full-screen takeover between content
        disableVideo: true, // Ezoic video players and video ads
        anchorAdPosition: 'bottom', // sticky bar at bottom, matching the Fuse sticky footer
    });
    // Force the sticky bar on, replacing Fuse sticky_footer. No <EzoicAd> for this.
    setEzoicAnchorAd(true);

    return (
        <App test={props.test} adProvider={"ezoic"}/>
    )
}