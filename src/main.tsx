import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error('Elemento #root não encontrado');

createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
