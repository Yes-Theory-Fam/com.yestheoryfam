import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import Landing from "./components/Landing";

ReactDOM.render(
  <Landing compiler="TypeScript" framework="React" />,
  document.getElementById("example")
);

if (module.hot){
  module.hot.accept()
}
