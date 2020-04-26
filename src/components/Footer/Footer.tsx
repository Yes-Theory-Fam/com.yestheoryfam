import * as React from "react";
import "./Footer.scss";
import Logo from "../Logo/Logo";
import { FaFacebookF, FaInstagram, FaYoutube }from 'react-icons/fa';

const Footer: React.FC<{}> = () => {
  return (
    <div className="footer column-center">
      <Logo />
      <div className="footer-links column-center">
        <a href="https://discord.gg/yestheory" target="_blank">Discord</a>
        {/* TODO: Add these back in once they work and increase the width styling as well.
        <Link to="/">Contact</Link>
        <Link to="/">Press</Link> */}
        <a href="https://seekdiscomfort.com" target="_blank">
          Seek Discomfort
        </a>
      </div>
      <div className="iconLinks"> <a className="facebookIcon"href="https://www.facebook.com/groups/yesfam/" target="_blank"><FaFacebookF /> </a> <a className="instagramIcon" href="https://www.instagram.com/yestheory/" target="_blank"><FaInstagram/> </a> <a className="youtubeIcon" href="https://www.youtube.com/channel/UCvK4bOhULCpmLabd2pDMtnA" target="_blank"><FaYoutube/> </a>
      </div>
      <div className="footer-copyright">
        &#169; {new Date().getFullYear()} YESTHEORYFAM
      </div>
    </div>
  );
};

export default Footer;
