import * as React from "react";
import "./Footer.scss";

import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer column-center">
      <Logo />
      <div className="footer-links column-center">
        <Link to="/">Discord</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Press</Link>
        <a href="https://seekdiscomfort.com" target="_blank">Seek Discomfort</a>
      </div>
      <div className="footer-copyright">
        &#169; {new Date().getFullYear()} YESTHEORYFAM
      </div>
    </div>
  );
};

export default Footer;
