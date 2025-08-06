import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./index.css";
import { AuthProvider } from "./src/AuthContext";

// Only ONE createRoot call
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
