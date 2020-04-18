import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";
import Home from "./pages/home/Home";
import BlogOverview from "./pages/BlogOverview/BlogOverview";
import Meetups from "./pages/meetups/Meetups";
import PhotoWall from "./pages/photowall/PhotoWall";
import MeetupDetails from "./pages/MeetupDetails/MeetupDetails";
import { UserContext } from "./UserContext";
import Groupchats from "./pages/groupchats/Groupchats";
import BuddyProject from "./pages/BuddyProject/BuddyProject";
import WorkInProgress from "./pages/WorkInProgress/WorkInProgress";
import { BUDDY_PROJECT_MODE } from "./config";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import axios from "axios";
import IDiscordUser from "./types/User";

const DiscordApi = () => {
  const api = axios.create({
    baseURL: "https://discordapp.com/api/",
    timeout: 3000,
    headers: { Authorization: localStorage.getItem("access_token") },
  });
  return api;
};

const getInitialUser = async (): Promise<IDiscordUser> => {
  if (!localStorage.getItem("access_token")) {
    throw new Error("no stored access token");
  }

  const userResponse = await DiscordApi().get("users/@me");
  const { id, username, avatar, discriminator, email } = userResponse.data;

  return {
    username,
    avatar,
    id,
    discriminator,
    email,
  };
};

const App = () => {
  const [user, setUser] = React.useState<undefined | IDiscordUser>(undefined);
  React.useEffect(() => {
    getInitialUser()
      .then(setUser)
      .catch((err) => console.error(err.toString()));
  }, [setUser]);

  return (
    <Router>
      <ToastContainer />
      <ScrollToTop />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route
            path="/auth/discord"
            exact
            component={DiscordAuthenticationRequest}
          />
          <Route
            path="/oauth/redirect"
            exact
            component={DiscordAuthenticationCallback}
          />
          <Route path="/buddyproject" exact component={BuddyProject} />
          {BUDDY_PROJECT_MODE && <Route path="/" component={WorkInProgress} />}
          <Route path="/blog" exact component={BlogOverview} />
          <Route path="/photowall" exact component={PhotoWall} />
          <Route path="/groupchats" exact component={Groupchats} />
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
          />
          <Redirect path="/" to="/home" />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
