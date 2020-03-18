import * as React from 'react';
import './NavBar.scss';
import DiscordLogo from "../../assets/Discord-Logo-White.svg";
import { NavLink } from 'react-router-dom';

const isLoggedIn = false;
const showLoginButton = false;

const Logo: React.FC = () => {
    return <a href="/" id="nav-bar-logo">YESTHEORY<b>FAM</b></a>
}

const Link: React.FC<{href: string, text: string}> = ({href, text}: {href: string, text: string}) => {
    return <a href={href}>{text}</a>
}

const DiscordLoginButton: React.FC = () => {
    const LogoContainer = () => <div className="discord-logo"><DiscordLogo /></div>;

    return <div className="discord-login-container">
        <a className="discord-login" href="/auth/discord">
            <LogoContainer />
            LOGIN VIA DISCORD
        </a>
    </div>;
}

const CircularAvatar: React.FC = () => {
  return (
      <div
        className="avatar-container"
      >
        <img
          className="circle-avatar"
          src="https://mirrors.creativecommons.org/presskit/icons/nc-jp.png" //Just some random thing that worked
          height="26"
          width="26"
        />
        Username
      </div>
    // </div>
  );
};

const NavBar: React.FC<{fixed: boolean}> = ({fixed}) => {
  const pages = ["home", "blog", "meetups", "photowall", "groupchats", "about", "contact"];

  const pageToNavLink = (page: string) => <NavLink to={`/${page}`} activeClassName="current">{page.toUpperCase()}</NavLink>;

  return <div id="nav-bar" className={fixed ? "fixed" : ""}>
      <Logo />
      <div id="nav-links">
          {pages.map(pageToNavLink)}
          {showLoginButton && <DiscordLoginButton />}
          {isLoggedIn && <CircularAvatar />}
      </div>
  </div>
};

export default NavBar;
