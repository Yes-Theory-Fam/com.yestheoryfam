import * as React from "react";
import * as ReactDOM from "react-dom";

import { Landing } from "./components/Landing";

if (module.hot){
    module.hot.accept()
  }

ReactDOM.render(
    <Landing compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
