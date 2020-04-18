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
          <div className="page-header">
            Work in <div className="inline-blue">progress</div>
          </div>
          <img src={CutestBotAround} />
          <div className="column-center wip-content-paragraphs">
            {paragraphs}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WorkInProgress;
