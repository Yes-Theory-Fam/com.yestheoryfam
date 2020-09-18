import * as React from "react";
import styles from "./SuggestionCard.module.scss";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import classNames from "classnames";

const SuggestionCard: React.FC<{ completed: boolean; content: string }> = ({
  completed,
  content,
}) => {
  const completedIcon = <IoMdCheckmark color="blue" />;
  const notCompletedIcon = <IoMdClose color="red" />;

  return (
    <div className={classNames(styles.suggestionCard, "row")}>
      {completed ? completedIcon : notCompletedIcon}
      {content}
    </div>
  );
};

export default SuggestionCard;
