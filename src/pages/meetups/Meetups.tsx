import * as React from "react";

import format from "date-fns/format";

import IMeetupProps from "../../types/Meetups";
import SearchBar from "../../components/SearchBar/SearchBar";

import { IoIosPeople, IoMdCalendar } from "react-icons/io";

import styles from "./Meetups.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className={classNames(styles.meetupsHeading, "page-header")}>
      FIND A <div className="inline-blue">FiYESta</div> NEAR YOU
    </div>
  );
};

const MeetupList: React.FC<{ meetups: Array<IMeetupProps> }> = ({ meetups }) => {
  return (
    <div className={styles.meetupsGrid}>
      {meetups.map((meetup, index) => (
        <MeetupTile key={index} {...meetup} />
      ))}
    </div>
  );
};

const TileImage: React.FC<{ imageSource: string }> = ({ imageSource }) => {
  return (
    <div className={styles.meetupsTileImage}>
      <img src={imageSource} alt="" />
    </div>
  );
};

const MeetupTile: React.FC<IMeetupProps> = (props) => {
  const { children, ...meetupProps } = props;
  const { title, description, dateStart, dateEnd, limit, imageSource } = meetupProps;

  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const dateFormat = "do' of 'LLLL";

  return (
    <Link to={{ pathname: "/meetups/0", state: meetupProps }} className={classNames(styles.meetupsTile, "column")}>
      <TileImage imageSource={imageSource} />
      <div className={styles.meetupsTileTitle}>{title}</div>
      <div className={classNames(styles.meetupsTileInfo, "column")}>
        {description}
        <div className={classNames(styles.meetupsTileInfoRow, "row")}>
          <IoMdCalendar size={18} className={styles.infoIcon} />
          {`${format(start, dateFormat)} - ${format(end, dateFormat)}`}
        </div>

        <div className={classNames(styles.meetupsTileInfoRow, "row")}>
          <IoIosPeople size={18} className={styles.infoIcon} />
          {`${limit} limit`}
        </div>
      </div>
    </Link>
  );
};

const Meetups: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const filter = search.toLowerCase();
  const filteredMeetups = meetups.filter(
    ({ title, description }) => title.toLowerCase().includes(filter) || description.toLowerCase().includes(filter)
  );

  return (
    <div className={classNames(styles.meetups, "column-center")}>
      <Header />
      <SearchBar
        setSearch={setSearch}
        hasInput={search !== ""}
        placeholder="Discover events near you..."
        containerClassName={styles.meetupsSearchContainer}
        searchBarClassName=""
      />
      {filteredMeetups.length > 0 ? (
        <MeetupList meetups={filteredMeetups} />
      ) : (
        <div className={classNames(styles.meetupsNoContent, "centered-content")}>No meetups found</div>
      )}
    </div>
  );
};

const meetups: Array<IMeetupProps> = [
  {
    title: "FiYESta Croatia",
    description: "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description: "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Bali 2020",
    description: "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description: "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Croatia",
    description: "Four days in Zagreb with a day trip to Plitvice Lakes and lots more exploring around Croatia.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Hamburg B-Day 2020",
    description: "Staying in a group room of the Generator Hostel, celebrating James' birthday just like last time!",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
  {
    title: "FiYESta Bali 2020",
    description: "A 10-day trip to explore Bali, Indonesia and stay in one of the exclusive villas in the Canggu area.",
    dateStart: Date.now(),
    dateEnd: Date.now(),
    limit: 45,
    details: [""],
    imageSource: `https://picsum.photos/520/503?a=${Math.random()}`,
  },
];

export default Meetups;
