import * as React from "react";
import { format } from 'date-fns';

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { arrayToChunks } from "../../utils";

import PeopleIcon from "../../assets/people-icon-blue.svg";
import CalendarIcon from "../../assets/breeze-icons-calendar.svg";

import "./Meetups.scss";

interface IMeetupProps {
  title: string;
  description: string;
  dateStart: number;
  dateEnd: number;
  limit: number;
}

const IconConstraint: React.FC = ({ children }) => {
  return <div className="icon-constraint">{children}</div>;
};

const Header: React.FC = () => {
  return (
    <div className="page-header meetups-heading">
      FIND A <div className="inline-blue">FiYESta</div> NEAR YOU
    </div>
  );
};

const SearchBar: React.FC = () => {
  return (
    <input
      className="meetups-search"
      type="text"
      placeholder="Discover events near you..."
    />
  );
};

const MeetupList: React.FC<{ meetups: Array<IMeetupProps> }> = ({
  meetups
}) => {
  const chunks = arrayToChunks(meetups, 3);
  return (
    <div className="meetups-list column">
      {chunks.map(chunk => (
        <MeetupRow meetups={chunk} />
      ))}
    </div>
  );
};

const MeetupRow: React.FC<{ meetups: Array<IMeetupProps> }> = ({ meetups }) => {
  return (
    <div className="meetups-row row">
      {meetups.map((meetup, index) => (
        <MeetupTile {...meetup} last={index === meetups.length - 1}/>
      ))}
    </div>
  );
};

const MeetupTile: React.FC<IMeetupProps & {last: boolean}> = ({
  title,
  description,
  dateStart,
  dateEnd,
  limit,
  last
}) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const dateFormat = "do' of 'LLLL";

  return (
    <div className={`meetups-tile${last ? "-last" : ""} column`}>
      <img
        className="meetups-tile-image"
        src={`https://picsum.photos/398/260?a=${title}`}
      />
      <div className="meetups-tile-title">{title}</div>
      {description}
      <div className="row">
        <IconConstraint>
          <CalendarIcon />
        </IconConstraint>
        {`${format(start, dateFormat)} - ${format(end, dateFormat)}`}
        {/*TODO: Cases like 1th 2th and 3th */}
      </div>

      <div className="row">
        <IconConstraint>
          <PeopleIcon />
        </IconConstraint>
        {` ${limit} limit`}
      </div>
    </div>
  );
};

const Meetups: React.FC = () => {
  return (
    <>
      <NavBar fixed={false} />
      <div className="meetups column-center">
        <Header />
        <SearchBar />
        <MeetupList meetups={meetups} />
      </div>
      <Footer />
    </>
  );
};

const meetups: Array<IMeetupProps> = [
  {
    title: "FiYESta Croatia",
    description:
      "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Bali 2020",
    description:
      "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Croatia",
    description:
      "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  },
  {
    title: "FiYESta Bali 2020",
    description:
      "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45
  }
  // {
  //   title: "FiYESta Croatia",
  //   description:
  //     "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
  //   dateStart: Date.now(),
  //   dateEnd: Date.now(),
  //   limit: 45
  // },
];

export default Meetups;
