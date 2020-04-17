import * as React from "react";
import "./NavBar.scss";
import DiscordLogo from "../../assets/Discord-Logo-White.svg";
import { NavLink, Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserContext } from "../../UserContext";
import CloseBurgerOnNav from "../CloseBurgerOnNav/CloseBurgerOnNav";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import pages, { NavPage } from "./pages";

import { BUDDY_PROJECT_MODE } from "../../config";

const isLoggedIn = false;
let showLoginButton = true;

const CurrentUser: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const imageUrl = `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`;
  return (
    <div className="row nav-bar-links-link column-center">
      <img src={imageUrl} alt={user?.username} className="user-avatar"></img>
      <span>
        {user?.username}#{user?.discriminator}
      </span>
    </div>
  );
};

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

const CircularAvatar: React.FC = () => {
  return (
    <div className="avatar-container row">
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

const NavContent: React.FC<{ className: string }> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

const HamburgerNav: React.FC<{
  open: boolean;
  onCloseButton: () => void;
  onOpenButton: () => void;
}> = ({ children, open, onCloseButton, onOpenButton }) => {
  if (!open) {
    return (
      <IoMdMenu size={42} onClick={onOpenButton} className="hamburger-icon" />
    );
  }

  return (
    <div className={`hamburger-menu column-center ${open ? "open" : ""}`}>
      <div className="row hamburger-menu-top">
        <Logo />
        <IoMdClose size={24} onClick={onCloseButton} />
      </div>
      <NavContent
        children={children}
        className="hamburger-menu-links column-center"
      />
    </div>
  );
};

const NavBar: React.FC<{ fixed: boolean; classNames?: string }> = ({
  fixed,
  classNames,
}) => {
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  const { user } = React.useContext(UserContext);
  if (user) {
    showLoginButton = false;
  }
  const NewPill: React.FC = () => {
    return <div className="nav-bar-links-newpill centered-content">NEW</div>;
  };

  const renderedPages: Array<NavPage> = BUDDY_PROJECT_MODE
    ? [{ display: "buddy project", isNew: true, path: "buddyproject" }]
    : pages;

  const pageToNavLink = (page: NavPage) => (
    <NavLink
      to={`/${page.path}`}
      activeClassName="current"
      key={page.path}
      className="row nav-bar-links-link"
    >
      {page.display.toUpperCase()}
      {page.isNew && <NewPill />}
    </NavLink>
  );

  const userNav = renderedPages.map(pageToNavLink);
  if (isLoggedIn) userNav.push(<CircularAvatar />);
  if (showLoginButton) userNav.push(<DiscordLoginButton key="discord-logo" />);
  if (!showLoginButton) userNav.push(<CurrentUser />);

  return (
    <div className={`row nav-bar ${fixed ? "fixed" : ""} ${classNames || ""}`}>
      <Logo />
      <NavContent className="nav-bar-links" children={userNav} />
      <HamburgerNav
        children={userNav}
        open={hamburgerOpen}
        onCloseButton={() => setHamburgerOpen(false)}
        onOpenButton={() => setHamburgerOpen(true)}
      />
      <CloseBurgerOnNav closeNav={() => setHamburgerOpen(false)} />
    </div>
  );
};

export default NavBar;
