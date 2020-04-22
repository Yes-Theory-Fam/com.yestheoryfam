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
import {
  Aboutus,
  BlogOverview,
  BuddyProject,
  Groupchats,
  Home,
  MeetupDetails,
  Meetups,
  PhotoWall,
  WorkInProgress,
} from './pages';
import { UserContext } from "./UserContext";
import { BUDDY_PROJECT_MODE } from "./config";
import { ScrollToTop, SavePage } from "./components/NavHooks";
import axios from "axios";
import IDiscordUser from "./types/User";


export const DiscordApi = (type = "user") => {
  const api = axios.create({
    baseURL: "https://discordapp.com/api/",
    timeout: 3000,
    headers: {
      Authorization:
        type === "user"
          ? `Bearer ${localStorage.getItem("access_token")}`
          : `Bot ${process.env.REACT_APP_DISCORD_BOT_TOKEN}`,
    },
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
      <SavePage />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
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
          <Route path="/home" exact component={Home} />
          <Route path="/about" exact component={Aboutus} />
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
