import * as React from "react";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { paragraphs } from "./copy";
import "./WorkInProgress.scss";

import BehindTheProject from "../../assets/underconstruction.png";

const WorkInProgress: React.FC = () => {
  return (
    <div className="column-center wip">
      <div className="column-center wip-content">
        <img src={BehindTheProject} />
        <div className="page-header">Under construction</div>
        <div className="column-center wip-content-paragraphs">{paragraphs}</div>
        <a
          href="https://discord.gg/yestheory"
          target="_blank"
          className="button inverted"
        >
          JOIN NOW
        </a>
      </div>
    </div>
  );
};

export default WorkInProgress;
