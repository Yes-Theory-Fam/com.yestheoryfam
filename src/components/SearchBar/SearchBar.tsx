import * as React from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

import './SearchBar.scss';

const YES_THEORY_BLUE = "rgb(1, 102, 255)";

const SearchBar: React.FC<{
  setSearch: (newSearch: string) => void;
  hasInput: boolean;
  placeholder: string;
  containerClassName: string;
  searchBarClassName: string;
}> = ({ setSearch, hasInput, placeholder, containerClassName, searchBarClassName}) => {
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

  const onInput = (ev: React.FormEvent<HTMLInputElement>) => setSearch((ev.target as HTMLInputElement).value);

  return (
    <div className={`column ${containerClassName}`}>
      <div className={`search-bar-searching ${hasInput ? "" : "hidden"}`}>Searching...</div>
      <div className={`centered-content`}>
        <input
          ref={searchBar}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onInput={onInput}
          type="text"
          placeholder={placeholder}
          className={`search-bar ${searchBarClassName}`}
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
    </div>
  );
};

export default SearchBar;
