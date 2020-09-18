import * as React from "react";
import Logo from "../Logo/Logo";
import classNames from "classnames";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={classNames(styles.footer, "column-center")}>
      <Logo />
      <div className={classNames(styles.footerLinks, "column-center")}>
        <a href="https://discord.gg/yestheory" target="_blank">
          Discord
        </a>
        {/* TODO: Add these back in once they work and increase the width styling as well.
        <Link to="/">Contact</Link>
        <Link to="/">Press</Link> */}
        <a href="https://seekdiscomfort.com" target="_blank">
          Seek Discomfort
        </a>
      </div>
      <div className={styles.footerCopyright}>&#169; {new Date().getFullYear()} YESTHEORYFAM</div>
    </div>
  );
};

export default Footer;
