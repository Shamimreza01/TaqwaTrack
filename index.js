import React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";

const rootdom=document.getElementById("root");
const root = createRoot(rootdom);
console.log("App component is rendered");
root.render(<App />);
