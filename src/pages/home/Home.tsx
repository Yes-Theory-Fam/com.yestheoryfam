import * as React from "react";
import "./Home.scss";
import cloudBig from "../../assets/cloudBig.png";
import cloudBot from "../../assets/cloudBot.png";
import NavBar from "../../components/NavBar/NavBar";
import ExpandForMore from "../../assets/expand-for-more-yt-blue.svg";

const Content: React.FC = () => {
  return <div className="coming-soon">COMING SOON!</div>;
};

const Home: React.FC = () => {
  return (
    <>
      <NavBar fixed={true} />
      <div>
        <div className="container yes-background">YES</div>
        <div className="container clouds-background">
          <img src={cloudBig} className="cloud big-back" />
        </div>
        <div className="container mountain" />
        <div className="container content">
          <div className="clouds-front">
            <img src={cloudBot} className="cloud bot-front" />
            <img src={cloudBot} className="cloud bot-front" />
            <img src={cloudBig} className="cloud big-front" />
            <img src={cloudBig} className="cloud big-front" />
            <div className="scroll-for-more">
              SCROLL FOR MORE
              <div className="expand-container">
                <ExpandForMore />
              </div>
            </div>
          </div>
          <Content />
        </div>
      </div>
    </>
  );
};

export default Home;
