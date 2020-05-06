import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";
import { WorkInProgress, pages } from "./pages";
import { UserContext } from "./UserContext";
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

  const availablePages = pages.filter(({ available }) => available);

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
          {availablePages.map((page) => (
            <Route path={"/" + page.path} {...page.component} key={page.path} />
          ))}
          <Route path="/" component={WorkInProgress} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
