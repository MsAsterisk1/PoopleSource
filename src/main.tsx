import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './Elements/App';
import {BrowserRouter, Route, Routes} from "react-router";
import Support from "./Support.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<App test />} />
                <Route path="/test/publift" element={<App test testCase={"publift"} />} />
                <Route path="/test/ezoic" element={<App test testCase={"ezoic"} />} />
                <Route path="/support" element={<Support />} />
                {/*<Route path="/privacy" element={<Privacy />} />*/}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);