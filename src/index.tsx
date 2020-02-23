import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Landing from "./components/Landing/Landing";
import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/auth/discord">
                <DiscordAuthenticationRequest />
            </Route>
            <Route path="/oauth/redirect">
                <DiscordAuthenticationCallback />
            </Route>
            <Route path="/">
                <Landing compiler="TypeScript" framework="React" />
            </Route>
        </Switch>
    </Router>,
    document.getElementById("example")
);

if (module.hot) {
    module.hot.accept()
}
