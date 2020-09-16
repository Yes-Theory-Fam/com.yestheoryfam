import * as React from "react";
import { IoMdClose, IoMdSearch } from "react-icons/io";

import styles from "./SearchBar.module.scss";
import classNames from "classnames";

const YES_THEORY_BLUE = "rgb(1, 102, 255)";

const SearchBar: React.FC<{
  setSearch: (newSearch: string) => void;
  hasInput: boolean;
  placeholder: string;
  containerClassName: string;
  searchBarClassName: string;
}> = ({
  setSearch,
  hasInput,
  placeholder,
  containerClassName,
  searchBarClassName,
}) => {
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

  const onInput = (ev: React.FormEvent<HTMLInputElement>) =>
    setSearch((ev.target as HTMLInputElement).value);

  return (
    <div className={classNames("column", containerClassName)}>
      <div className={classNames(styles.searchBarSearching, {[styles.hidden]: !hasInput})}>
        Searching...
      </div>
      <div className={`centered-content`}>
        <input
          ref={searchBar}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onInput={onInput}
          type="text"
          placeholder={placeholder}
          className={classNames(styles.searchBar, searchBarClassName)}
        />
        <div className={styles.searchBarIcon}>
          {hasInput ? (
            <IoMdClose
              onClick={clearSearch}
              className={classNames(styles.pointer, styles.searchBarIcon)}
              {...iconProps}
            />
          ) : (
            <IoMdSearch className={styles.searchBarIcon} {...iconProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
