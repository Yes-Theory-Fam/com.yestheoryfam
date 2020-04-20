import * as React from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserContext } from "../../UserContext";
import CloseBurgerOnNav from "../NavHooks/CloseBurger";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import pages, { NavPage } from "./pages";
import DiscordLoginButton from "../DiscordLoginButton/DiscordLoginButton";

import { BUDDY_PROJECT_MODE } from "../../config";

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
}

const CurrentUser: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const imageUrl = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}` : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"
  return (
    <div className="row avatar-container">
      <img
        src={imageUrl}
        alt={user?.username}
        className="circle-avatar"
        height="42"
        width="42"
      />
      {user?.username}#{user?.discriminator}
      <button className="button logout" onClick={() => logout()}>LOGOUT</button>
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
    <div className={`side-drawer column-center ${open ? "open" : ""}`}>
      <div className="side-drawer-top">
        <Logo />
        <IoMdClose size={24} onClick={onCloseButton} />
      </div>
      <NavContent
        children={children}
        className="side-drawer-links column-center"
      />
    </div>
  )
};

const NavBar: React.FC<{ fixed: boolean; classNames?: string }> = ({
  fixed,
  classNames,
}) => {
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  const { user } = React.useContext(UserContext);
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
  if (!user) userNav.push(<DiscordLoginButton key="discord-logo" />);
  if (user) userNav.push(<CurrentUser key="current-user" />);

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
