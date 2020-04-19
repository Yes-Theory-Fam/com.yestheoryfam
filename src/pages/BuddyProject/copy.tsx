import * as React from "react";

const howToJoin = (
  <div>
    <div className="blue">
      <b>Click the button down below!</b>
    </div>
    Once you do that, you will be asked to join the <b>Yes Theory Fam</b> server
    (if you’re not already in it). From then on, everything will be happening on{" "}
    <a href="https://discordapp.com" target="_blank" className="inline-blue">
      Discord
    </a>
    .
  </div>
);

const whatNext = (
  <div>
    <div>
      When the sign-up deadline is reached, everyone will be matched with a
      buddy.
    </div>
    <div className="inline-blue">
      <b>Yes Bot</b>
    </div>
    , our very own bot, will message you on discord with the name of your
    partner and a set of questions. One of you will have to message the other.
  </div>
);

const howItWorks = (
  <div>
    How will it work? Both of you will have your own set of questions, and
    you’ll each take turns asking a question from your list, and both answering,
    until there are no more questions left.
  </div>
);

export { howToJoin, whatNext, howItWorks };
