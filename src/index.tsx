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
import { UserContext } from "./UserContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import axios from "axios";
import IDiscordUser from "./types/User";

const DiscordApi = () => {
  const api = axios.create({
    baseURL: "https://discordapp.com/api/",
    timeout: 3000,
    headers: {"Authorization":localStorage.getItem("access_token")}
  })
  return api;
}

const getInitialUser = async () : Promise<IDiscordUser> => {
  const { id, username, avatar, discriminator, email } = await DiscordApi().get("users/@me");
  return {
    username,
    avatar,
    id,
    discriminator,
    email
  }
}



const App = () => {


  const [ user, setUser ] = React.useState<undefined | IDiscordUser>(undefined);
  getInitialUser().then(setUser);
  
  return (
    <Router>
      <ToastContainer />
      <ScrollToTop />
      <UserContext.Provider value={{user, setUser}}>
      <Switch>
        
        <Route path="/" exact component = {Home} />
        <Route path="/auth/discord" exact component = {DiscordAuthenticationRequest} />
        <Route path="/oauth/redirect" exact component = {DiscordAuthenticationCallback} />
        <Route path="/blog" exact component = {BlogOverview} />
        <Route path="/photowall" exact component = {PhotoWall} />
        <Route path="/meetups" render={({ match: { url } }) => (
          <>
            <Route path={`${url}/:id`} component={MeetupDetails} />
            <Route path={`${url}/`} exact>
              <Meetups />
            </Route>
          </>)}/>
      </Switch>
      </UserContext.Provider>

    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));



if (module.hot) {
  module.hot.accept();
}
