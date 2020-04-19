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

const NotLoggedIn = () => (
  <p>
    Let’s get started, shall we? To sign up to the buddy project, you first have
    to login with discord and be in the Yes Theory Fam server. This is where you
    will be connected with your buddy.
  </p>
);


const NotSignedUp = () => (
  <>
    <p>
      An opportunity to get to know a person miles away from you, building a new
      friendship, and discovering a new way of living, what’s not to like? Click
      that join button to sign up to the buddy project!
    </p>
    <br />
    <p>
      Once you do that, you will be asked to join the Yes Theory Fam server (if
      you’re not already in it). From then on, everything will be happening on
      Discord. When the sign-up deadline is reached, everyone will be matched
      with a buddy.
    </p>
    <br />
    <p>
      Yes Bot, our very own bot, will message you on discord with the name of
      your partner and a set of questions. Your buddy and you will both get a
      message, and you’ll have to make sure to message each other! You’ll have
      two different sets of questions, and you’ll each take turns asking a
      question from your list, and both answering, until there are no more
      questions left.
    </p>
    <br />
    <p>
      We hope you enjoy and make a lifelong friend. Don’t forget to update us on
      how things are going in #buddy-project, on the Yes Theory Fam server, we
      would absolutely love to hear all about your experience.
    </p>
    <br />
    <p>
      Be sure to stay around on the server once this event is over, we have many
      more awesome projects planned for you!
    </p>
  </>
);

const SignedUp = () => (
  <>
    <p>
      Seems like you’re already signed up and good to go! From now on,
      everything will be happening on Discord.{" "}
    </p>
    <p>
      When the sign-up deadline is reached, everyone will be matched with a
      buddy.{" "}
    </p>
    <p>
      Yes Bot, our very own bot, will message you with the name of your partner
      and a set of questions. Your buddy and you will both get a message, and
      you’ll have to make sure to message each other! You’ll have two different
      sets of questions, and you’ll each take turns asking a question from your
      list, and both answering, until there are no more questions left. We hope
      you enjoy and make a lifelong friend!{" "}
    </p>
    <p>
      Don’t forget to update us on how things are going in #buddy-projects, on
      the Yes Theory Fam server, we would absolutely love to hear all about your
      experience.{" "}
    </p>
  </>
);

const SignupError = () => (
  <p>
    Hey there! Something seems to have gone wrong. Please refresh the page, orf
    try to login again.
  </p>
);


export {
  howItWorks,
  howToJoin,
  NotLoggedIn,
  NotSignedUp,
  SignedUp,
  SignupError,
  whatNext,
};
