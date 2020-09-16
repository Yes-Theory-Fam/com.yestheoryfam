import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./HomeEntry.module.scss";
import classNames from "classnames";

interface IHomeEntryProps {
  imageSide: "left" | "right";
  headerBlackText: string;
  headerBlueText: string;
}

const HomeEntry: React.FC<IHomeEntryProps> = ({
  imageSide,
  headerBlackText,
  headerBlueText,
  children,
}) => {
  return (
    <div
      className={classNames(styles.entry, {
        row: imageSide === "left",
        "row-reverse": imageSide !== "left",
      })}
    >
      <img src={`https://picsum.photos/674/674?a=${headerBlackText}`} />
      <div className={classNames(styles.entryTextContent, "column")}>
        <EntryHeader
          headerBlackText={headerBlackText}
          headerBlueText={headerBlueText}
        />
        <div className={styles.entrySummary}>{children}</div>
        <Link to="/" className="button">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

// TODO: Fix desktop

const EntryHeader: React.FC<{
  headerBlackText: string;
  headerBlueText: string;
}> = ({ headerBlackText, headerBlueText }) => {
  return (
    <div className={styles.entryHeader}>
      {headerBlackText + " "}
      <div className="inline-blue">{headerBlueText}</div>
    </div>
  );
};

export default HomeEntry;
