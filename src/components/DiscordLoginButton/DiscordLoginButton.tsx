import * as React from "react";
import { Link } from "react-router-dom";
import DiscordLogo from "../../assets/Discord-Logo.svg";
import "./DiscordLoginButton.scss";

const DiscordLoginButton: React.FC<{ inverted?: boolean }> = ({ inverted = false }) => {
  const LogoContainer = () => (
    <div className="discord-logo" key="discord-logo">
      <DiscordLogo />
    </div>
  );

  return (
    <div className="discord-login-container">
      <Link className={`discord-login row ${inverted ? "inverted" : ""}`} to="/auth/discord">
        <LogoContainer />
        LOGIN VIA DISCORD
      </Link>
    </div>
  );
};

export default DiscordLoginButton;
