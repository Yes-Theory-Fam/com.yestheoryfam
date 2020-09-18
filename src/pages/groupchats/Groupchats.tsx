import * as React from "react";
import styles from "./Groupchats.module.scss";
import classNames from "classnames";

import SearchBar from "../../components/SearchBar/SearchBar";

interface IGroupchat {
  country: string;
  city: string;
  link: string;
  id: number;
}

const chatList: Array<IGroupchat> = [
  {
    country: "Belgium",
    city: "Antwerp",
    link: "https://youtu.be/dQw4w9WgXcQ",
    id: 0,
  },
  {
    country: "Belgium",
    city: "Brussels",
    link: "https://www.pointless.com/",
    id: 1,
  },
  {
    country: "Germany",
    city: "Berlin",
    link: "https://shouldiblamecaching.com/",
    id: 2,
  },
  {
    country: "Belgium",
    city: "Antwerp",
    link: "https://youtu.be/dQw4w9WgXcQ",
    id: 0,
  },
  {
    country: "Belgium",
    city: "Brussels",
    link: "https://www.pointless.com/",
    id: 1,
  },
  {
    country: "Germany",
    city: "Berlin",
    link: "https://shouldiblamecaching.com/",
    id: 2,
  },
  {
    country: "Belgium",
    city: "Antwerp",
    link: "https://youtu.be/dQw4w9WgXcQ",
    id: 0,
  },
  {
    country: "Belgium",
    city: "Brussels",
    link: "https://www.pointless.com/",
    id: 1,
  },
  {
    country: "Germany",
    city: "Berlin",
    link: "https://shouldiblamecaching.com/",
    id: 2,
  },
];

const getSuggestions = (search: string) => {
  const input = search.trim().toLowerCase();
  const length = input.length;

  const filtered = chatList.filter(
    (chat) =>
      chat.city.toLowerCase().includes(input) ||
      chat.country.toLowerCase().includes(input)
  );

  return length < 2 ? [] : filtered;
};

const renderSuggestion = (suggestion: IGroupchat, index: number) => {
  return (
    <a
      className={classNames(styles.groupchatsAutoSuggestSuggestionsEntry, "column")}
      key={index}
      href={suggestion.link}
      target="_blank"
    >
      <div className={styles.groupchatsAutoSuggestSuggestionsEntryCity}>
        {suggestion.city}
      </div>
      <div className="inline-blue">{suggestion.link}</div>
    </a>
  );
};

const SuggestionContainer: React.FC<{ suggestions?: React.ReactNodeArray }> = ({
  suggestions,
}) => {
  return (
    <div className={classNames(styles.groupchatAutoSuggestSuggestions, "column")}>
      <div>
        {suggestions && suggestions.length > 0 && (
          <div className={styles.groupchatsAutoSuggestSuggestionsHeader}>
            Join your partners in crime...
          </div>
        )}
        <div className="column">{suggestions}</div>
      </div>
    </div>
  );
};

const Groupchats: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const suggestionObjects = getSuggestions(search);
  const suggestions = suggestionObjects.map((s, index) =>
    renderSuggestion(s, index)
  );

  return (
    <div className={classNames(styles.groupchats, "column-center")}>
      <div className="page-header">
        CONNECT WITH THE FAM FIND A <div className="inline-blue">GROUPCHAT</div>
      </div>
      <div className={classNames(styles.groupchatsAutoSuggest, "column-center")}>
        <SearchBar
          setSearch={setSearch}
          containerClassName={styles.groupchatsSearchContainer}
          hasInput={search.length > 0}
          searchBarClassName=""
          placeholder="Search for the tribe in your country..."
        />
        <SuggestionContainer suggestions={suggestions} />
      </div>
    </div>
  );
};

export default Groupchats;
