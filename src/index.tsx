import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Context } from "./context";

ReactDOM.render(
    <Context>
        <App />
    </Context>,
    document.getElementById("root")
);