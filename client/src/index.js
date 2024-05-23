import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assests/main.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
