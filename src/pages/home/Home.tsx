import * as React from "react";
import "./Home.scss";
import cloudBig from "../../assets/cloudBig.png";
import cloudBot from "../../assets/cloudBot.png";
import NavBar from "../../components/NavBar/NavBar";
import ExpandForMore from "../../assets/expand-for-more-yt-blue.svg";
import HomeEntry from "../../components/HomeEntry/HomeEntry";
import Footer from "../../components/Footer/Footer";

const Content: React.FC = () => {
  return (
    <div className="home-entries">
      <HomeEntry
        headerBlackText="Discover"
        headerBlueText="empowering stories"
        imageSide="left"
      >
        <p>
          We believe in authentic, fulfilling and life changing experiences.
          Therefore, <b>we want to share stories that matter</b> with the world
          as motivational examples of what can be achieved.
        </p>
        <br />
        <p>
          Read about the fulfilling experiences other YesFam members had, or
          join and share your own with the world.
        </p>
      </HomeEntry>
      <HomeEntry
        headerBlackText="Find closest"
        headerBlueText="meetups"
        imageSide="right"
      >
        <p>
          Wondering how to get involved in this amazing community? We are
          organising amazing events in many different countries. These events
          are called <b>FiYESta</b>. Click the button below to find out when the
          next even will be happening.
        </p>
      </HomeEntry>
      <HomeEntry
        headerBlackText="Share your experience on the"
        headerBlueText="photowall"
        imageSide="left"
      >
        <p>
          Become a part of the story by sharing your photographs from the last
          event on our photowall. The more people can see it, the more people
          will get involved the next time. Make the FOMO be real!
        </p>
      </HomeEntry>
    </div>
  );
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
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
