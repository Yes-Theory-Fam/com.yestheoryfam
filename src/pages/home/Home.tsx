import * as React from "react";
import styles from "./Home.module.scss";
import classNames from "classnames";
import cloudBig from "../../assets/cloudBig.png";
import cloudBot from "../../assets/cloudBot.png";

import HomeEntry from "../../components/HomeEntry/HomeEntry";
import ScrollForAction from "../../components/ScrollForAction/ScrollForAction";

const Content: React.FC = () => {
  return (
    <div className={classNames(styles.homeEntries, "column-center")}>
      <HomeEntry headerBlackText="Discover" headerBlueText="empowering stories" imageSide="left">
        <p>
          We believe in authentic, fulfilling and life-changing experiences. Therefore,{" "}
          <b>we want to share stories that matter</b> with the world as motivational examples of what can be achieved.
        </p>
        <br />
        <p>
          Read about the heart-warming experiences other YesFam members had, or join and share your own with the world.
        </p>
      </HomeEntry>
      <HomeEntry headerBlackText="Find the closest" headerBlueText="meetups" imageSide="right">
        <p>
          Wondering how to get involved in this amazing community? We are organising amazing events in many different
          countries. These events are called <b>FiYEStas</b>. Click the button below to find out when the next even will
          be happening.
        </p>
      </HomeEntry>
      <HomeEntry headerBlackText="Share your experience on the" headerBlueText="photowall" imageSide="left">
        <p>
          Become part of the story by sharing your photographs from the last event on our photowall. The more people see
          it, the more people will want to get involved the next time. Let the FOMO be real!
        </p>
      </HomeEntry>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <div className={styles.cloudsMountainYesContainer}>
        <div className={classNames(styles.container, styles.yesBackground)}>YES</div>
        <div className={classNames(styles.container, styles.cloudsBackground)}>
          <img src={cloudBig} className={classNames(styles.cloud, styles.bigBack)} />
        </div>
        <div className={classNames(styles.container, styles.mountain)} />
        <div className={styles.cloudsFront}>
          <img src={cloudBot} className={classNames(styles.cloud, styles.botFront)} />
          <img src={cloudBot} className={classNames(styles.cloud, styles.botFront)} />
          <div style={{ maxWidth: "100vw", overflow: "hidden" }} className={styles.cloud}>
            <img src={cloudBig} className={classNames(styles.cloudR, styles.bigFront)} />
          </div>
          <div style={{ maxWidth: "100vw", overflow: "hidden" }} className={styles.cloud}>
            <img src={cloudBig} className={classNames(styles.cloudR, styles.bigFront)} />
          </div>
          <ScrollForAction containerClassNames={styles.scrollForAction} callText={"SCROLL FOR MORE"} />
        </div>
      </div>
      <div className={classNames(styles.content, "column")}>
        <Content />
      </div>
    </div>
  );
};

export default Home;
