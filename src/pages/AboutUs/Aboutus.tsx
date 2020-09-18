import * as React from "react";
import styles from "./Aboutus.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { IconBaseProps } from "react-icons";

import { team, Socials, TeamMember, platforms } from "./Team";
import { introduction, why } from "./copy";

import BehindTheProject from "../../assets/behindtheproject.png";
import classNames from "classnames";

const SocialIcon: React.FC<{
  Icon: React.JSXElementConstructor<IconBaseProps>;
  ariaLabel: string;
  href: string;
  color: string;
}> = ({ Icon, ariaLabel, href, color }) => {
  return (
    <div>
      <a
        className={styles.sociali}
        href={href}
        target="_blank"
        aria-label={ariaLabel}
      >
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
    <div className={styles.socialIcons}>
      <div className={styles.socialIconsSet}>{socialArr}</div>
    </div>
  );
};

const MemberTile: React.FC<{ info: TeamMember }> = ({ info }) => {
  return (
    <div className={classNames(styles.teamIndividual, "column")}>
      <div className="column">
        <img
          className={styles.teamIndividualAvatar}
          src={info.portfolioPic}
          alt={info.name}
        />
        <div className={classNames(styles.teamIndividualInfo, "column")}>
          <p className="blue">{info.name}</p>
          <strong className={styles.title}>{info.title}</strong>
          <p className={styles.quote}>"{info.quote}"</p>
        </div>
      </div>
      <SocialMediaInfo socials={info.socials} />
    </div>
  );
};

const TopContent: React.FC = () => {
  return (
    <div className={classNames(styles.aboutUsTopContent, "column-center")}>
      <div className={classNames(styles.aboutUsTopText, "column")}>
        <div className={classNames(styles.aboutUsHeader, "column")}>
          People behind this <div className="inline-blue">project</div>
        </div>
        <div className={styles.aboutUsIntro}>{introduction}</div>
        <div className={styles.aboutUsSection}>Why did we say yes?</div>
        <div className={styles.aboutUsIntro}>{why}</div>
      </div>
      <div className={classNames(styles.aboutUsTopImage, "centered-content")}>
        <img src={BehindTheProject} />
      </div>
    </div>
  );
};

const AboutUs: React.FC = () => {
  const headerRef = React.useRef() as React.RefObject<HTMLDivElement>;

  // TODO NavBar selector - Gotta fix this when extracting to its own component
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
    <div className={classNames(styles.aboutUs, "column-center")}>
      <div className={classNames(styles.aboutUsTop, "column-center")}>
        <TopContent />
        <div className={classNames(styles.scrollForMore, "column-center")} onClick={scrollToAction}>
          MEET THE TEAM
          <div className={styles.expandContainer}>
            <IoIosArrowDown size={20} />
          </div>
        </div>
      </div>
      <div className={classNames(styles.aboutUsPeople, "column")}>
        <div className={styles.aboutUsHeader} ref={headerRef}>
          Meet the <div className="inline-blue">team</div>
        </div>
        <div className={styles.teamPics}>
          {team.map((person, idx) => {
            return <MemberTile info={person} key={`${person.name}-${idx}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
