import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Support from "./Support.tsx";
import EzoicAppWrapper from "./Elements/AdTest/EzoicAppWrapper.tsx";
import PubliftAppWrapper from "./Elements/AdTest/PubliftAppWrapper.tsx";
import ConditionalEzoicProvider from "./Elements/AdTest/ConditionalEzoicProvider.tsx";
import AdTestAppWrapper from "./Elements/AdTest/AdTestAppWrapper.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const adProvider = sessionStorage.getItem("adProvider") ?? "publift"

root.render(
    <React.StrictMode>
        <ConditionalEzoicProvider active={adProvider === "ezoic"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PubliftAppWrapper />} />
                    <Route path="/test" element={<AdTestAppWrapper test />} />
                    <Route path="/test/publift" element={<PubliftAppWrapper test />} />
                    <Route path="/test/ezoic" element={<EzoicAppWrapper test />} />
                    <Route path="/support" element={<Support />} />
                </Routes>
            </BrowserRouter>
        </ConditionalEzoicProvider>
    </React.StrictMode>
);