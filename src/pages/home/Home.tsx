import * as React from "react";
import "./Home.scss";
import cloudBig from "../../assets/cloudBig.png";
import cloudBot from "../../assets/cloudBot.png";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown } from "react-icons/io";

import HomeEntry from "../../components/HomeEntry/HomeEntry";
import Footer from "../../components/Footer/Footer";

const Content: React.FC = () => {
  return (
    <div className="home-entries column-center">
      <HomeEntry
        headerBlackText="Discover"
        headerBlueText="empowering stories"
        imageSide="left"
      >
        <p>
          We believe in authentic, fulfilling and life-changing experiences.
          Therefore, <b>we want to share stories that matter</b> with the world
          as motivational examples of what can be achieved.
        </p>
        <br />
        <p>
          Read about the heart-warming experiences other YesFam members had, or
          join and share your own with the world.
        </p>
      </HomeEntry>
      <HomeEntry
        headerBlackText="Find the closest"
        headerBlueText="meetups"
        imageSide="right"
      >
        <p>
          Wondering how to get involved in this amazing community? We are
          organising amazing events in many different countries. These events
          are called <b>FiYEStas</b>. Click the button below to find out when the
          next even will be happening.
        </p>
      </HomeEntry>
      <HomeEntry
        headerBlackText="Share your experience on the"
        headerBlueText="photowall"
        imageSide="left"
      >
        <p>
          Become part of the story by sharing your photographs from the last
          event on our photowall. The more people see it, the more people
          will want to get involved the next time. Let the FOMO be real!
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
        <div className="container content column">
          <div className="clouds-front">
            <img src={cloudBot} className="cloud bot-front" />
            <img src={cloudBot} className="cloud bot-front" />
            <img src={cloudBig} className="cloud big-front" />
            <img src={cloudBig} className="cloud big-front" />
            <div className="scroll-for-more column-center">
              SCROLL FOR MORE
              <div className="expand-container">
                <IoIosArrowDown size={20} />
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
