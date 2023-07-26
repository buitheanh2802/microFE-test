import React from"react";
import{ createRoot }from"react-dom/client";
import App from "./app";
import type { Root } from "react-dom/client";

const configuration = (): void => {
    const element: HTMLDivElement = document.querySelector('#root');
    if(!element) return;
    const root: Root = createRoot(element);
    root.render(<App />)
    console.log(root);
    
}

configuration();

export default configuration;