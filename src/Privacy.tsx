import "./Privacy.css"
// Core viewer
import {Viewer, Worker} from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function Privacy() {
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div className={"Privacy"}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                    fileUrl='public/privacy-policy.pdf'
                    plugins={[
                        defaultLayoutPluginInstance,
                    ]}
                />
            </Worker>
        </div>
    )
}