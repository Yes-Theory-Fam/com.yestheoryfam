import * as React from "react";
import { useHistory } from "react-router-dom";
import RedirectNotice from "../RedirectNotice/RedirectNotice";
import Cookies from "js-cookie";

const DiscordAuthenticationCallback = () => {
  const storedState = localStorage.getItem("auth_state");
  const sentState = new URLSearchParams(window.location.hash).get("state");
  const token_type = new URLSearchParams(window.location.hash).get(
    "token_type"
  );
  const access_token = new URLSearchParams(window.location.hash).get(
    "access_token"
  );
  const token_expiration = (new URLSearchParams(window.location.hash).get(
    "expires_in"
  ) as unknown) as number;
  localStorage.removeItem("auth_state");

  localStorage.setItem("access_token", `Bearer ${access_token}`);
  const history = useHistory();
  history.push("/");

  if (storedState !== sentState) {
    console.error(
      "Stored state did not equal the one sent by discord. User won't be authenticated!"
    );
    return <></>;
  }

  // Use the token to do auth here.

  return <></>;
};

export default DiscordAuthenticationCallback;
