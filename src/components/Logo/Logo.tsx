import * as React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className={styles.logo}>
      YESTHEORY<b>FAM</b>
    </Link>
  );
};

export default Logo;
