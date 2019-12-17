import * as React from "react";
import * as ReactDOM from "react-dom";

import { Landing } from "./components/Landing";

ReactDOM.render(
    <Landing compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);