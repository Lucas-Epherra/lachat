import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <FloatingWhatsApp />
  </React.StrictMode>
);