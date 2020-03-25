import * as React from 'react';
import './NavBar.scss';
import DiscordLogo from "../../assets/Discord-Logo-White.svg";
import { NavLink, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

const isLoggedIn = false;
const showLoginButton = false;

const DiscordLoginButton: React.FC = () => {
    const LogoContainer = () => <div className="discord-logo"><DiscordLogo /></div>;
    
    return <div className="discord-login-container">
        <Link className="discord-login" to="/auth/discord">
            <LogoContainer />
            LOGIN VIA DISCORD
        </Link>
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
