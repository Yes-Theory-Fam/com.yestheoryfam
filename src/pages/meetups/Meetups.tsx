import * as React from "react";
import { format } from "date-fns";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import IMeetupProps from '../../types/Meetups';
import { arrayToChunks } from "../../utils";

import {
  IoMdSearch,
  IoMdClose,
  IoIosPeople,
  IoMdCalendar
} from "react-icons/io";

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

const SearchBar: React.FC<{
  setSearch: (newSearch: string) => void;
  hasInput: boolean;
}> = ({ setSearch, hasInput }) => {
  const searchBar = React.useRef<HTMLInputElement | null>(null);

  const [hasFocus, setFocus] = React.useState(false);

  const clearSearch = () => {
    if (searchBar.current) {
      searchBar.current.value = "";
      setSearch("");
    }
  };

  const iconColor = hasFocus ? YES_THEORY_BLUE : "#8C8C8C";
  const iconProps = { color: iconColor, size: 20 };

  return (
    <div className="centered-content meetups-search-container">
      <input
        ref={searchBar}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onInput={ev => setSearch((ev.target as HTMLInputElement).value)}
        className="meetups-search"
        type="text"
        placeholder="Discover events near you..."
      />
      <div className={"search-bar-icon"}>
        {hasInput ? (
          <IoMdClose
            onClick={clearSearch}
            className="pointer search-bar-icon"
            {...iconProps}
          />
        ) : (
          <IoMdSearch className="search-bar-icon" {...iconProps} />
        )}
      </div>
    </div>
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
        <MeetupTile {...meetup} last={index === meetups.length - 1} />
      ))}
    </div>
  );
};

const MeetupTile: React.FC<IMeetupProps & { last: boolean }> = (props) => {
  const {last, children, ...meetupProps} = props;
  const {
    title,
    description,
    dateStart,
    dateEnd,
    limit,
  } = meetupProps;

  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const dateFormat = "do' of 'LLLL";

  return (
    <Link
      to={{pathname: "/meetups/0", state: meetupProps}}
      className={`meetups-tile${last ? "-last" : ""} column`}
    >
      <img
        className="meetups-tile-image"
        src={`https://picsum.photos/398/260?a=${title}`}
      />
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
        <SearchBar setSearch={setSearch} hasInput={search !== ""} />
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
