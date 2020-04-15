import * as React from "react";

import { format } from "date-fns";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import IMeetupProps from "../../types/Meetups";
import { arrayToChunks } from "../../utils";
import SearchBar from "../../components/SearchBar/SearchBar";

import { IoIosPeople, IoMdCalendar } from "react-icons/io";

import "./Meetups.scss";
import { Link } from "react-router-dom";

const YES_THEORY_BLUE = "rgb(1, 102, 255)";

const Header: React.FC = () => {
  return (
    <div className="page-header meetups-heading">
      FIND A <div className="inline-blue">FiYESta</div> NEAR YOU
    </div>
  );
};

const MeetupList: React.FC<{ meetups: Array<IMeetupProps> }> = ({
  meetups,
}) => {
  const chunks = arrayToChunks(meetups, 3);
  return (
    <div className="meetups-list column">
      {chunks.map((chunk, index) => (
        <MeetupRow meetups={chunk} key={index} />
      ))}
    </div>
  );
};

const MeetupRow: React.FC<{ meetups: Array<IMeetupProps> }> = ({ meetups }) => {
  return (
    <div className="meetups-row row">
      {meetups.map((meetup, index) => (
        <MeetupTile
          {...meetup}
          last={index === meetups.length - 1}
          key={index}
        />
      ))}
    </div>
  );
};

const TileImage: React.FC<{ imageSource: string }> = ({ imageSource }) => {
  return (
    <div className="meetups-tile-image">
      <img src={imageSource} alt="" />
    </div>
  );
};

const MeetupTile: React.FC<IMeetupProps & { last: boolean }> = (props) => {
  const { last, children, ...meetupProps } = props;
  const {
    title,
    description,
    dateStart,
    dateEnd,
    limit,
    imageSource,
  } = meetupProps;

  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const dateFormat = "do' of 'LLLL";

  return (
    <Link
      to={{ pathname: "/meetups/0", state: meetupProps }}
      className={`meetups-tile${last ? "-last" : ""} column`}
    >
      <TileImage imageSource={imageSource} />
      <div className="meetups-tile-title">{title}</div>
      {description}
      <div className="row">
        <IoMdCalendar size={18} color={YES_THEORY_BLUE} className="info-icon" />
        {`${format(start, dateFormat)} - ${format(end, dateFormat)}`}
        {/*TODO: Cases like 1th 2th and 3th */}
      </div>

      <div className="row">
        <IoIosPeople size={18} color={YES_THEORY_BLUE} className="info-icon" />
        {`${limit} limit`}
      </div>
    </Link>
  );
};

const Meetups: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const filter = search.toLowerCase();
  const filteredMeetups = meetups.filter(
    ({ title, description }) =>
      title.toLowerCase().includes(filter) ||
      description.toLowerCase().includes(filter)
  );

  return (
    <>
      <NavBar fixed={false} />
      <div className="meetups column-center">
        <Header />
        <SearchBar
          setSearch={setSearch}
          hasInput={search !== ""}
          placeholder="Discover events near you..."
          containerClassName="meetups-search-container"
          searchBarClassName=""
        />
        {filteredMeetups.length > 0 ? (
          <MeetupList meetups={filteredMeetups} />
        ) : (
          <div className="centered-content meetups-no-content">
            No meetups found
          </div>
        )}
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
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Bali 2020",
    description:
      "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Croatia",
    description:
      "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description:
      "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Bali 2020",
    description:
      "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
];

export default Meetups;
