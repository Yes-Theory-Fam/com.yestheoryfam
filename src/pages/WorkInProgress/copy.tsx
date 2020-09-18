import * as React from "react";
import { Link } from "react-router-dom";

const paragraphs = [
  <div key="p1">
    We are happy to have you around and chances are you came here for the{" "}
    <Link to="/buddyproject" className="link">
      Buddy Project.
    </Link>
  </div>,
  <div key="p2">
    Please note that this page is under heavy construction so new features will pop up soon when everything is set up!
  </div>,
  <div key="p3">We are looking forward to having you back when our photowall, meetups and groupchats launch.</div>,
  <div key="p4">While you are waiting, check out our Discord server!</div>,
];

export { paragraphs };
