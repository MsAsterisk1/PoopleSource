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
                <Route path="/support" element={<Support />} />
                {/*<Route path="/privacy" element={<Privacy />} />*/}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);