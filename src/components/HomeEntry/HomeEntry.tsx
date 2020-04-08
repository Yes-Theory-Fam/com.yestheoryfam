import * as React from "react";
import { Link } from "react-router-dom";

import "./HomeEntry.scss";

interface IHomeEntryProps {
  imageSide: "left" | "right";
  headerBlackText: string;
  headerBlueText: string;
}

const HomeEntry: React.FC<IHomeEntryProps> = ({
  imageSide,
  headerBlackText,
  headerBlueText,
  children
}) => {
  return (
    <div className={`entry ${imageSide === "left" ? "row" : "row-reverse"}`}>
      <img src={`https://picsum.photos/674/674?a=${headerBlackText}`} />
      <div className="entry-text-content column">
        <EntryHeader
          headerBlackText={headerBlackText}
          headerBlueText={headerBlueText}
        />
        <div className="entry-summary">{children}</div>
        <Link to="/" className="button">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

const EntryHeader: React.FC<{
  headerBlackText: string;
  headerBlueText: string;
}> = ({ headerBlackText, headerBlueText }) => {
  return (
    <div className="entry-header">
      {headerBlackText + " "}
      <div className="inline-blue">{headerBlueText}</div>
    </div>
  );
};

export default HomeEntry;
