import * as React from "react";
import steps from "./copy";
import IMeetupProps from "../../types/Meetups";

import styles from "./MeetupDetails.module.scss";
import classNames from "classnames";

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
  return <div className={styles.meetupDetailsDescription}>{description}</div>;
};

const HowToJoin: React.FC = () => {
  return (
    <div className={classNames(styles.meetupDetailsHowToJoin, "column-center")}>
      <div className={styles.meetupDetailsHowToJoinHeader}>How to join?</div>
      <div className={styles.meetupDetailsHowToJoinCards} style={{ flexWrap: "wrap", justifyContent: "space-evenly" }}>
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
    <div className={classNames(styles.meetupDetailsHowToJoinCard, "column")}>
      <div className={styles.meetupDetailsHowToJoinCardHeader}>Step {stepIndex}</div>
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
    <div className={classNames(styles.meetupDetailsMoreInformation, "column")}>
      <div className={classNames(styles.meetupDetailsMoreInformationImage, "centered-content")}>
        <img src={image} alt="" />
      </div>
      <div className={classNames(styles.textContent, "column")}>
        <div className={styles.sectionHeader}>More information</div>
        <div className={classNames(styles.meetupDetailsMoreInformationInfoRow, "row")}>
          <IoMdCalendar size={18} className={styles.infoIcon} />
          {`${format(dateStart, dateFormat)} - ${format(dateEnd, dateFormat)}`}
        </div>

        <div className={classNames(styles.meetupDetailsMoreInformationInfoRow, "row")}>
          <IoIosPeople size={18} className={styles.infoIcon} />
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
    <Link className={classNames(styles.meetupDetailsBackButton, "button")} to="/meetups">
      CHECK OTHER MEETUPS
    </Link>
  );
};

const MeetupDetails: React.FC<RouteComponentProps<{ id: string }, {}, IMeetupProps>> = ({ location, match }) => {
  const { title, description, dateStart, dateEnd, limit, details, imageSource } = location?.state;

  const { id } = match.params;
  console.log(id);

  return (
    <div className={classNames(styles.meetupDetails, "column-center")}>
      <Header title={title} />
      <Description description={description} />
      <HowToJoin />
      <MoreInformation dateStart={dateStart} dateEnd={dateEnd} limit={limit} details={details} image={imageSource} />
      <BackToMeetups />
    </div>
  );
};

export default MeetupDetails;
