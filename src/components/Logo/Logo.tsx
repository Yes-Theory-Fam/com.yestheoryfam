import * as React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo">
      YESTHEORY<b>FAM</b>
    </Link>
  );
};

export default Logo;
