import * as React from "react";
import { Link } from "react-router-dom";

const header = "Welcome to the YesTheoryFam page!";
const paragraphs = [
  <div>
    We are happy to have you here and chances are you came here for the{" "}
    <Link to="/buddyproject" className="inline-blue">
      Buddy project.
    </Link>
  </div>,
  <div>
    Please note that this page is under heavy constructions so new features will
    pop up soon when everything is set up!
  </div>,
  <div>
    We are looking forward to having you back soon when our photowall, meetups
    and groupchats launch.
  </div>,
];

export { header, paragraphs };
