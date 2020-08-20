import * as React from "react";
import "./SuggestionCard.scss";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";

const SuggestionCard: React.FC<{ completed: boolean; content: string }> = ({
  completed,
  content,
}) => {
  const completedIcon = <IoMdCheckmark color="blue" />;
  const notCompletedIcon = <IoMdClose color="red" />;

  return (
    <div className="suggestion-card row">
      {completed ? completedIcon : notCompletedIcon}
      {content}
    </div>
  );
};

export default SuggestionCard;
