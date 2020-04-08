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
import { ToastContainer } from 'react-toastify';

import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";
import Home from "./pages/home/Home";
import BlogOverview from "./pages/BlogOverview/BlogOverview";
import Meetups from "./pages/meetups/Meetups";
import PhotoWall from "./pages/photowall/PhotoWall";
import MeetupDetails from "./pages/MeetupDetails/MeetupDetails";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <Router>
    <ToastContainer />
    <ScrollToTop />
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
      <Route path="/photowall">
        <PhotoWall />
      </Route>
      <Route
        path="/meetups"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/:id`} component={MeetupDetails} />
            <Route path={`${url}/`} exact>
              <Meetups />
            </Route>
          </>
        )}
      ></Route>
      <Redirect path="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById("example")
);

if (module.hot) {
  module.hot.accept();
}
