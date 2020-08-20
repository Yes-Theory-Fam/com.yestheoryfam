import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import steps from "./copy";
import Footer from "../../components/Footer/Footer";
import IMeetupProps from "../../types/Meetups";

import "./MeetupDetails.scss";

import { Link, RouteProps, RouteComponentProps } from "react-router-dom";
import format from "date-fns/format";
import { IoIosPeople, IoMdCalendar } from "react-icons/io";

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
    <div className="column meetup-details-more-information">
      <div className="meetup-details-more-information-image centered-content">
        <img src={image} alt="" />
      </div>
      <div className="column text-content">
        <div className="section-header">More information</div>
        <div className="row meetup-details-more-information-info-row">
          <IoMdCalendar size={18} className="info-icon" />
          {`${format(dateStart, dateFormat)} - ${format(dateEnd, dateFormat)}`}
        </div>

        <div className="row meetup-details-more-information-info-row">
          <IoIosPeople size={18} className="info-icon" />
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
  );
};

export default MeetupDetails;
