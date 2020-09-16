import * as React from "react";
import styles from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserContext } from "../../UserContext";
import CloseBurgerOnNav from "../NavHooks/CloseBurger";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { pages, NavPage } from "../../pages";
import DiscordLoginButton from "../DiscordLoginButton/DiscordLoginButton";

import { CSSTransition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import classNames from 'classnames';

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const CurrentUser: React.FC = () => {
  const { user } = React.useContext(UserContext);
  const imageUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`
    : "https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png";
  return (
    <div className={classNames("column", styles.avatarContainer)}>
      <div className="row centered-content">
        <img
          src={imageUrl}
          alt={user?.username}
          className={styles.circleAvatar}
          height="42"
          width="42"
        />
        <div className={styles.avatarUser}>
          {user?.username}#{user?.discriminator}
        </div>
      </div>
      <button className={classNames("button", styles.logout)} onClick={() => logout()}>
        LOGOUT
      </button>
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
  open: TransitionStatus;
  onCloseButton: () => void;
  onOpenButton: () => void;
}> = ({ children, open, onCloseButton, onOpenButton }) => {
  const defaultStyle: React.CSSProperties = {
    right: "-100%",
    transition: "all 150ms ease-out",
  };

  const transitionStyles: {
    [key in TransitionStatus]?: React.CSSProperties;
  } = {
    entering: {
      right: 0,
    },
    entered: {
      right: 0,
    },
  };

  return (
    <>
      <IoMdMenu size={42} onClick={onOpenButton} className={styles.hamburgerIcon} />
      <div
        style={{ ...defaultStyle, ...transitionStyles[open] }}
        className={classNames(styles.sideDrawer, "column-center", { [styles.open]: open !== "exited"})}
      >
        <div className={classNames(styles.sideDrawerTop, "row")}>
          <Logo />
          <IoMdClose size={42} onClick={onCloseButton} />
        </div>
        <NavContent
          children={children}
          className={classNames(styles.sideDrawerLinks, "column-center")}
        />
      </div>
    </>
  );
};

const NavBar: React.FC<{ fixed: boolean; classNames?: string }> = ({
  fixed,
  classNames: barClassNames,
}) => {
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

  const { user } = React.useContext(UserContext);
  const NewPill: React.FC<{ fraud?: boolean }> = ({ fraud }) => {
    return (
      <div
        className={classNames(styles.navBarLinksNewpill, "centered-content", {[styles.fraud]: fraud})}
      >
        NEW
      </div>
    );
  };

  const pageToNavLink = (page: NavPage, available: boolean = false) => (
    <NavLink
      to={`/${page.path}`}
      activeClassName={styles.current}
      key={page.path}
      className={classNames("row", styles.navBarLinksLink, {[styles.unavailable]: !available})}
    >
      {page.isNew && <NewPill fraud />}
      <div className={styles.navBarLinksLinkTitle}>
        {page.display.toUpperCase()}
      </div>
      {page.isNew && <NewPill />}
    </NavLink>
  );

  const userNav = pages
    .filter(({ available }) => available)
    .map((p) => pageToNavLink(p, true));
  const mobileNav = pages.map((p) => pageToNavLink(p, p.available));

  if (user) userNav.push(<CurrentUser key="current-user" />);

  if (!user) userNav.push(<DiscordLoginButton key="discord-logo" />);
  if (!user) mobileNav.push(<DiscordLoginButton key="discord-logo" inverted />);

  return (
    <div className={classNames("row", styles.navBar, { [styles.fixed]: fixed }, barClassNames)}>
      <Logo />
      <NavContent className={styles.navBarLinks} children={userNav} />
      <CSSTransition timeout={150} in={hamburgerOpen}>
        {(state) => (
          <HamburgerNav
            children={mobileNav}
            open={state}
            onCloseButton={() => setHamburgerOpen(false)}
            onOpenButton={() => setHamburgerOpen(true)}
          />
        )}
      </CSSTransition>
      <CloseBurgerOnNav closeNav={() => setHamburgerOpen(false)} />
    </div>
  );
};

export default NavBar;
