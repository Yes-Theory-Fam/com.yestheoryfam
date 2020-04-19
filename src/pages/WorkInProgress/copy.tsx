import * as React from "react";
import { Link } from "react-router-dom";

const paragraphs = [
  <div>
    We are happy to have you around and chances are you came here for the{" "}
    <Link to="/buddyproject" className="inline-blue">
      Buddy project.
    </Link>
  </div>,
  <div>
    Please note that this page is under heavy construction so new features will
    pop up soon when everything is set up!
  </div>,
  <div>
    We are looking forward to having you back when our photowall, meetups and
    groupchats launch.
  </div>,
  <div>While you are waiting, check out our Discord server!</div>,
];

export { paragraphs };
