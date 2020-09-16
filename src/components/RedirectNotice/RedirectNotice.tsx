import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./Redirect.module.scss";
import classNames from "classnames";

interface RedirectNoticeProps {
  url: string;
}

const RedirectNotice: React.FC<RedirectNoticeProps> = ({ url }) => {
  return (
    <div className={classNames(styles.discordAuth, "column-center")}>
      <p>You should have been redirected already!</p>
      <p>
        Click <Link to={url}>here</Link> to get to where you should have went.
      </p>
    </div>
  );
};

export default RedirectNotice;
