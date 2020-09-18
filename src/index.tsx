import * as React from "react";
import * as ReactDOM from "react-dom";

import "./reset.css";
import "./index.scss";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DiscordAuthenticationRequest from "./components/DiscordAuthenticationRequest/DiscordAuthenticationRequest";
import DiscordAuthenticationCallback from "./components/DiscordAuthenticationCallback/DiscordAuthenticationCallback";
import { WorkInProgress, pages } from "./pages";
import { UserContext } from "./UserContext";
import { ScrollToTop, SavePage } from "./components/NavHooks";
import IDiscordUser from "./types/User";
import DiscordApi from "./apis/discord";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

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
        <NavBar fixed />
        <Switch>
          <Route path="/auth/discord" exact component={DiscordAuthenticationRequest} />
          <Route path="/oauth/redirect" exact component={DiscordAuthenticationCallback} />
          {availablePages.map((page) => (
            <Route path={"/" + page.path} {...page.component} key={page.path} />
          ))}
          <Redirect exact path="/" to="/buddyproject" />
          <Route path="/" component={WorkInProgress} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
