import * as React from "react";
import { Link } from "react-router-dom";
import DiscordLogo from "../../assets/Discord-Logo-White.svg";
import "./DiscordLoginButton.scss";

const DiscordLoginButton: React.FC = () => {
  const LogoContainer = () => (
    <div className="discord-logo" key="discord-logo">
      <DiscordLogo />
    </div>
  );

  return (
    <div className="discord-login-container">
      <Link className="discord-login row" to="/auth/discord">
        <LogoContainer />
        LOGIN VIA DISCORD
      </Link>
    </div>
  );
};

export default DiscordLoginButton;
