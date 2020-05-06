import * as React from "react";

const howToJoin = (
  <div>
    <div className="blue">
      <b>Click the button down below!</b>
    </div>
    Once you do that, you will be asked to join the <b>Yes Theory Fam</b> server
    (if you’re not already in it). From then on, everything will be happening on{" "}
    <a href="https://discordapp.com" target="_blank" className="link">
      Discord
    </a>
    .
  </div>
);

const whatNext = (
  <div>
    <div>
      As soon as the sign-up deadline is reached, everyone will be matched with
      a buddy.
    </div>
    <div className="inline-blue">
      <b>Yes Bot</b>
    </div>
    , our very own bot, will message you on discord with the name of your
    partner, a set of questions and further instructions. One of you will start
    messaging the other.
  </div>
);

const howItWorks = (
  <div>
    Both of you will be given your own set of questions, with each of you taking
    turns asking and both answering them until all the questions are cleared.
  </div>
);

const SuccessfulSignup: React.FC<{ user: string }> = ({ user }) => (
  <p>
    Hey {user}, you have successfully signed up to the Buddy Project! Make sure
    to regularly check your messages on Discord, since that's where you will
    receive the name of your buddy, your set of questions, as well as further
    instructions on how things will go. If you have any concerns or need
    clarifications, feel free to ask in #buddy-project, on the Yes Theory Fam
    Discord Server.
  </p>
);

export { howItWorks, howToJoin, SuccessfulSignup, whatNext };
