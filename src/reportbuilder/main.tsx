import React from "react";
import ReactDOM from "react-dom/client";
import "katex/dist/katex.min.css";
import ReportBuilder from "./ReportBuilder";
import "./reportbuilder.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReportBuilder />
  </React.StrictMode>,
);
