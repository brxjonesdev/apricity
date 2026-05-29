import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import ApricityApp from "./App";
import { ActiveStoryProvider } from "./shared/context/ActiveStoryContext";
import { ActiveEntityProvider } from "./shared/context/ActiveEntityContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ActiveStoryProvider>
      <ActiveEntityProvider>
        <ApricityApp />
      </ActiveEntityProvider>
    </ActiveStoryProvider>
  </React.StrictMode>,
);
