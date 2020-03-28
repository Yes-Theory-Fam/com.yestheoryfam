import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";
import Home from "./pages/home/Home";
import BlogOverview from "./pages/BlogOverview/BlogOverview";
import Meetups from "./pages/meetups/Meetups";
import PhotoWall from "./pages/photowall/PhotoWall";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/auth/discord">
        <DiscordAuthenticationRequest />
      </Route>
      <Route path="/oauth/redirect">
        <DiscordAuthenticationCallback />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/blog">
        <BlogOverview />
      </Route>
      <Route path="/meetups">
        <Meetups />
      </Route>
      <Route path="/photowall">
        <PhotoWall />
      </Route>
      <Redirect path="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById("example")
);

if (module.hot) {
  module.hot.accept();
}
