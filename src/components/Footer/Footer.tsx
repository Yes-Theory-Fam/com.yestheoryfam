import * as React from "react";
import "./Footer.scss";
import Logo from "../Logo/Logo";

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer column-center">
      <Logo />
      <div className="footer-links column-center">
        <a href="https://discord.gg/yestheory" target="_blank">Discord</a>
        {/* TODO: Add these back in once they work. 
        <Link to="/">Contact</Link>
        <Link to="/">Press</Link> */}
        <a href="https://seekdiscomfort.com" target="_blank">
          Seek Discomfort
        </a>
      </div>
      <div className="footer-copyright">
        &#169; {new Date().getFullYear()} YESTHEORYFAM
      </div>
    </div>
  );
};

export default Footer;
