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
        src="https://via.placeholder.com/674.png?text=Placeholder+for+Image"
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
        <EntryHeader
          headerBlackText={headerBlackText}
          headerBlueText={headerBlueText}
        />
        <div style={{ fontSize: 16, color: "black", width: "70%" }}>{children}</div>
        <Link
          to="/"
          style={{
            backgroundColor: "white",
            borderColor: "blue",
            borderRadius: 27,
            borderStyle: "solid",
            borderWidth: 2,
            color: "blue",
            fontSize: 16,
            height: 53,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            width: 297
          }}
        >
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
    <div className="header">
      {headerBlackText + " "}
      <div
        style={{
          display: "inline",
          color: "blue"
        }}
      >
        {headerBlueText}
      </div>
    </div>
  );
};

export default HomeEntry;
