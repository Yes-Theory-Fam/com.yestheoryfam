import * as React from "react";
import "./Groupchats.scss";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
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
      className="column groupchats-auto-suggest-suggestions-entry"
      key={index}
      href={suggestion.link}
      target="_blank"
    >
      <div className="groupchats-auto-suggest-suggestions-entry-city">
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
    <div className="column groupchats-auto-suggest-suggestions">
      <div>
        {suggestions && suggestions.length > 0 && (
          <div className="groupchats-auto-suggest-suggestions-header">
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
    <div className="column-center groupchats">
      <div className="page-header">
        CONNECT WITH THE FAM FIND A <div className="inline-blue">GROUPCHAT</div>
      </div>
      <div className="column-center groupchats-auto-suggest">
        <SearchBar
          setSearch={setSearch}
          containerClassName="groupchats-search-container"
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
