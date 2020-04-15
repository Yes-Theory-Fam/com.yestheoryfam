import * as React from "react";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { paragraphs } from "./copy";
import "./WorkInProgress.scss";

const WorkInProgress: React.FC = () => {
  return (
    <>
      <NavBar fixed />
      <div className="column-center wip">
        <div className="column-center wip-content">
          <div className="page-header">
            Work in <div className="inline-blue">progress</div>
          </div>
          {paragraphs}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default WorkInProgress;
