import * as React from "react";
import "./Aboutus.scss";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { IconBaseProps } from "react-icons";

import Footer from "../../components/Footer/Footer";
import { team, Socials, TeamMember, platforms } from "./Team";
import { introduction, why } from "./copy";

import BehindTheProject from "../../assets/behindtheproject.png";

const SocialIcon: React.FC<{
  Icon: React.JSXElementConstructor<IconBaseProps>;
  ariaLabel: string;
  href: string;
  color: string;
}> = ({ Icon, ariaLabel, href, color }) => {
  return (
    <div>
      <a className="sociali" href={href} target="_blank" aria-label={ariaLabel}>
        <Icon size={36} color={color} />
      </a>
    </div>
  );
};

const SocialMediaInfo: React.FC<{ socials: Socials }> = ({ socials }) => {
  let socialArr = [];

  const keys = Object.keys(socials) as Array<keyof Socials>;
  for (let i = 0; i < keys.length; i++) {
    const platform = keys[i];
    const link = socials[platform];
    const info = platforms[platform];
    if (link) {
      socialArr.push(
        <SocialIcon
          key={info.name.trim()}
          Icon={info.Icon}
          ariaLabel={info.name}
          href={link}
          color={info.color}
        />
      );
    }
  }

  return (
    <div className="social-icons">
      <div className="social-icons-set">{socialArr}</div>
    </div>
  );
};

const MemberTile: React.FC<{ info: TeamMember }> = ({ info }) => {
  return (
    <div className="column team-individual">
      <div className="column">
        <img
          className="team-individual-avatar"
          src={info.portfolioPic}
          alt={info.name}
        />
        <div className="team-individual-info column">
          <p className="blue">{info.name}</p>
          <strong className="title">{info.title}</strong>
          <p className="quote">"{info.quote}"</p>
        </div>
      </div>
      <SocialMediaInfo socials={info.socials} />
    </div>
  );
};

const TopContent: React.FC = () => {
  return (
    <div className="column-center about-us-top-content">
      <div className="column about-us-top-text">
        <div className="column about-us-header">
          People behind this <div className="inline-blue">project</div>
        </div>
        <div className="about-us-intro">{introduction}</div>
        <div className="about-us-section">Why did we say yes?</div>
        <div className="about-us-intro">{why}</div>
      </div>
      <div className="about-us-top-image centered-content">
        <img src={BehindTheProject} />
      </div>
    </div>
  );
};

const AboutUs: React.FC = () => {
  const headerRef = React.useRef() as React.RefObject<HTMLDivElement>;

  const scrollToAction = () => {
    const yOffset = -(
      document.querySelector(".nav-bar")?.getBoundingClientRect()?.height ?? 100
    );
    const y =
      (headerRef.current?.getBoundingClientRect()?.top ?? 0) +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <NavBar fixed={true} />
      <div className="about-us column-center">
        <div className="column-center about-us-top">
          <TopContent />
          <div
            className="scroll-for-more column-center"
            onClick={scrollToAction}
          >
            MEET THE TEAM
            <div className="expand-container">
              <IoIosArrowDown size={20} />
            </div>
          </div>
        </div>
        <div className="about-us-people column">
          <div className="about-us-header" ref={headerRef}>
            Meet the <div className="inline-blue">team</div>
          </div>
          <div className="team-pics">
            {team.map((person, idx) => {
              return <MemberTile info={person} key={`${person.name}-${idx}`} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
