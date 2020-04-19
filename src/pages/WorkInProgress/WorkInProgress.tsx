import * as React from "react";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { paragraphs } from "./copy";
import "./WorkInProgress.scss";

import CutestBotAround from "../../assets/yesbot-yougotmail.png";

const WorkInProgress: React.FC = () => {
  return (
    <div>
      <NavBar fixed />
      <div className="column-center wip">
        <div className="column-center wip-content">
          <img src={CutestBotAround} />
          <div className="page-header">Under construction</div>
          <div className="column-center wip-content-paragraphs">
            {paragraphs}
          </div>
          <a
            href="https://discord.gg/yestheory"
            target="_blank"
            className="button inverted"
          >
            JOIN NOW
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WorkInProgress;
