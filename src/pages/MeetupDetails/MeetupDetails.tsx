import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import steps from "./copy";
import Footer from "../../components/Footer/Footer";
import IMeetupProps from "../../types/Meetups";

import "./MeetupDetails.scss";

import { Link, RouteProps, RouteComponentProps } from "react-router-dom";
import { format } from "date-fns";
import { IoIosPeople, IoMdCalendar } from "react-icons/io";

const YES_THEORY_BLUE = "rgb(1, 102, 255)";

const Header: React.FC<{ title: string }> = ({ title }) => {
  const bluePart = /fiyesta (.*)/i.exec(title)?.[1];

  return (
    <div className="page-header">
      FiYESta <div className="inline-blue">{bluePart}</div>
    </div>
  );
};

const Description: React.FC<{ description: string }> = ({ description }) => {
  return <div className="meetup-details-description">{description}</div>;
};

// Might have to double check how to get those to the same height if needed.
// According to https://stackoverflow.com/questions/36004926/equal-height-rows-in-a-flex-container
// it's not possible with Flexbox; solution with grid is available.
const HowToJoin: React.FC = () => {
  return (
    <div className="meetup-details-how-to-join column-center">
      <div className="meetup-details-how-to-join-header">How to join?</div>
      <div
        className="meetup-details-how-to-join-cards"
        style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
      >
        {steps.map((step, index) => (
          <HowToJoinCard content={step} stepIndex={index + 1} key={index} />
        ))}
      </div>
    </div>
  );
};

const HowToJoinCard: React.FC<{
  stepIndex: number;
  content: React.ReactNode;
}> = ({ stepIndex, content }) => {
  return (
    <div className="meetup-details-how-to-join-card column">
      <div className="meetup-details-how-to-join-card-header">
        Step {stepIndex}
      </div>
      {content}
    </div>
  );
};

const MoreInformation: React.FC<{
  dateStart: number;
  dateEnd: number;
  limit: number;
  details: Array<string>;
  image: string;
}> = ({ dateStart, dateEnd, limit, details, image }) => {
  const dateFormat = "do' of 'LLLL";

  return (
    <div className="row meetup-details-more-information">
      <img src={image} alt="" />
      <div className="column text-content">
        <div className="section-header">More information</div>
        <div className="row">
          <IoMdCalendar
            size={18}
            color={YES_THEORY_BLUE}
            className="info-icon"
          />
          {`${format(dateStart, dateFormat)} - ${format(dateEnd, dateFormat)}`}
          {/*TODO: Cases like 1th 2th and 3th */}
        </div>

        <div className="row">
          <IoIosPeople
            size={18}
            color={YES_THEORY_BLUE}
            className="info-icon"
          />
          {`${limit} limit`}
        </div>
        {details.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

const BackToMeetups: React.FC = () => {
  return (
    <Link className="button meetup-details-back-button" to="/meetups">
      CHECK OTHER MEETUPS
    </Link>
  );
};

const MeetupDetails: React.FC<RouteComponentProps<
  { id: string },
  {},
  IMeetupProps
>> = ({ location, match }) => {
  const {
    title,
    description,
    dateStart,
    dateEnd,
    limit,
    details,
    imageSource,
  } = location?.state;

  const { id } = match.params;
  console.log(id);

  return (
    <>
      <NavBar fixed />
      <div className="column-center meetup-details">
        <Header title={title} />
        <Description description={description} />
        <HowToJoin />
        <MoreInformation
          dateStart={dateStart}
          dateEnd={dateEnd}
          limit={limit}
          details={details}
          image={imageSource}
        />
        <BackToMeetups />
      </div>
      <Footer />
    </>
  );
};

export default MeetupDetails;
