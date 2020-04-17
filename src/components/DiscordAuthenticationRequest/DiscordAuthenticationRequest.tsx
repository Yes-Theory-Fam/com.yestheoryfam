import * as React from "react";
import { randomString } from "../../utils";
import RedirectNotice from "../RedirectNotice/RedirectNotice";

const DiscordAuth = () => {
  const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const scope = encodeURIComponent(process.env.REACT_APP_DISCORD_SCOPE ?? "");
  const redirectUri = encodeURIComponent(
    process.env.REACT_APP_DISCORD_REDIRECT_URI ?? ""
  );

  const randomState = randomString() + randomString();

  const constructedLink = `https://discordapp.com/oauth2/authorize?response_type=token&client_id=${clientId}&state=${randomState}&scope=${scope}&redirect_uri=${redirectUri}`;

  localStorage.setItem("auth_state", randomState);

  window.location.assign(constructedLink);

  return <RedirectNotice url={constructedLink} />;
};

export default DiscordAuth;
