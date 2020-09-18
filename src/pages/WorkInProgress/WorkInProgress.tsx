import * as React from "react";

import { paragraphs } from "./copy";
import styles from "./WorkInProgress.module.scss";
import classNames from "classnames";

import BehindTheProject from "../../assets/underconstruction.png";

const WorkInProgress: React.FC = () => {
  return (
    <div className={classNames(styles.wip, "column-center")}>
      <div className={classNames(styles.wipContent, "column-center")}>
        <img src={BehindTheProject} />
        <div className="page-header">Under construction</div>
        <div className={classNames(styles.wipContentParagraphs, "column-center")}>{paragraphs}</div>
        <a href="https://discord.gg/yestheory" target="_blank" className="button inverted">
          JOIN NOW
        </a>
      </div>
    </div>
  );
};

export default WorkInProgress;
