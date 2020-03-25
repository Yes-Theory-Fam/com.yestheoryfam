import * as React from "react";
import "./Footer.scss";

import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer">
      <Logo />
      <div
        className="links"
      >
        <Link to="/">Discord</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Press</Link>
        <Link to="/">Too Easy</Link>
      </div>
      <div className="copyright">
        &#169; {new Date().getFullYear()} YESTHEORYFAM
      </div>
    </div>
  );
};

export default Footer;
