import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './Elements/App';
import {HashRouter, Route, Routes} from "react-router";
import Support from "./Support.tsx";
import Privacy from "./Privacy.tsx";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy" element={<Privacy />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);