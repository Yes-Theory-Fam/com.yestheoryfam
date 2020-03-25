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
    <div
      style={{
        height: 674,
        width: "80%",
        display: "flex",
        flexDirection: imageSide === "left" ? "row" : "row-reverse",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <img
        style={{ flex: 1 }}
        src={`https://picsum.photos/674/674?a=${headerBlackText}`}
      />
      <div
        style={{
          height: "70%",
          marginInlineStart: 35,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div className={`entry ${imageSide === "left" ? "row" : "row-reverse"}`}>
          <img src="https://via.placeholder.com/674.png?text=Placeholder+for+Image" />
          <div className="text-content">
            <EntryHeader
              headerBlackText={headerBlackText}
              headerBlueText={headerBlueText}
            />
            <div className="summary">{children}</div>
            <Link to="/" className="read-more">
              READ MORE
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


const EntryHeader: React.FC<{
  headerBlackText: string;
  headerBlueText: string;
}> = ({ headerBlackText, headerBlueText }) => {
  return (
    <div className="header">
      {headerBlackText + " "}
      <div className="blue-header">{headerBlueText}</div>
    </div>
  );
};

export default HomeEntry;
