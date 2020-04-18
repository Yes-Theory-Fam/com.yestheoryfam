import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown } from "react-icons/io";
import {
  initDb,
  buddyProjectSignup,
  fetchBuddyProjectSignup,
  BuddyProjectSignup,
} from "./buddyprojectFirebase";
import "./BuddyProject.scss";
import Footer from "../../components/Footer/Footer";

import BuddyProjectLogo from "../../assets/buddyproject_logo.svg";

enum LOGGED_IN_STATE {
  NOT_LOGGED_IN,
  LOGGED_IN_NOT_ON_SERVER,
  LOGGED_IN_ON_SERVER,
}
enum SIGNED_UP_STATE {
  NOT_LOADED,
  LOADING,
  SIGNED_UP,
  NOT_SIGNED_UP,
  ERROR,
}

const Signup: React.FC<BuddyProjectSignup> = ({
  discordUserId,
  discordUsername,
  displayName,
}) => {
  const [signupState, setSignupState] = React.useState(
    SIGNED_UP_STATE.NOT_LOADED
  );
  const [error, setError] = React.useState("");
  // This variable starts off as undefined, so that we can initiate a request
  // to fetch the user. The request will respond with either a BuddyProjectSignup or null.
  // In other words: currentSignup is `undefined` until we've fetched the current signup
  // and after that it'll be null or an object.
  const [currentSignup, setCurrentSignup] = React.useState<
    BuddyProjectSignup | null | undefined
  >(undefined);

  React.useEffect(() => {
    // Don't think this really is the place to do this, but hey time pressure etc.
    initDb();
  });

  React.useEffect(() => {
    if (currentSignup !== undefined) {
      // Don't try to fetch existing user unless this is undefined, which
      // is its initial value.
      return;
    }

    setSignupState(SIGNED_UP_STATE.LOADING);

    fetchBuddyProjectSignup(discordUserId)
      .then((signup) => {
        setSignupState(
          signup !== null
            ? SIGNED_UP_STATE.SIGNED_UP
            : SIGNED_UP_STATE.NOT_SIGNED_UP
        );
        setCurrentSignup(signup);
      })
      .catch((e) => {
        setSignupState(SIGNED_UP_STATE.ERROR);
        setError(e.toString());
      });
  });

  return (
    <div className="buddy-project-signup">
      <div className="column-center">
        <div className="upload-header">Find a stranger, discover a friend.</div>
        {/* @ToDo: if not logged in, make 'em log in */}
        <div>
          <header>
            <h3>Hi {displayName}!</h3>
            <p>Or should I call you {discordUsername}?</p>
          </header>
          <SignupText signupState={signupState} />
          {signupState === SIGNED_UP_STATE.NOT_SIGNED_UP && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buddyProjectSignup(discordUsername, displayName, discordUserId)
                  .then(() => setSignupState(SIGNED_UP_STATE.SIGNED_UP))
                  .catch((err) => {
                    setSignupState(SIGNED_UP_STATE.ERROR);
                    setError(err);
                  });
              }}
            >
              <button type="submit" className="button buddy-project-entry">
                GIVE ME A BUDDY
              </button>
            </form>
          )}
          {signupState === SIGNED_UP_STATE.ERROR && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

const InitialContent = () => (
  <div className="column-center photo-wall-top-content">
    <div className="buddy-project-logo">
      <BuddyProjectLogo />
    </div>
    <div className="buddy-project-text">
      <i>
        Great things come to those who are willing to risk rejection and put
        themselves out there.
      </i>
    </div>
  </div>
);

const BuddyProject: React.FC<{}> = () => {
  const signupRef = React.createRef() as React.RefObject<HTMLDivElement>;

  return (
    <>
      <NavBar fixed />
      <div className="column-center">
        <div className="column-center photo-wall-top">
          <div></div>
          {/* div required here to have space-between sort everything out */}
          <InitialContent />
          <div className="scroll-for-more column-center">
            GET INVOLVED
            <div className="expand-container">
              <IoIosArrowDown
                onClick={() =>
                  signupRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={signupRef}>
        <Signup
          discordUsername="YESBOT#0001"
          displayName="YesBot"
          discordUserId="614101602046836776"
        />
      </div>
      <Footer />
    </>
  );
};

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
    <p>
      Once you do that, you will be asked to join the Yes Theory Fam server (if
      you’re not already in it). From then on, everything will be happening on
      Discord. When the sign-up deadline is reached, everyone will be matched
      with a buddy.
    </p>
    <p>
      Yes Bot, our very own bot, will message you on discord with the name of
      your partner and a set of questions. Your buddy and you will both get a
      message, and you’ll have to make sure to message each other! You’ll have
      two different sets of questions, and you’ll each take turns asking a
      question from your list, and both answering, until there are no more
      questions left.
    </p>
    <p>
      We hope you enjoy and make a lifelong friend. Don’t forget to update us on
      how things are going in #buddy-project, on the Yes Theory Fam server, we
      would absolutely love to hear all about your experience.
    </p>
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
    Hey there! Something seems to have gone wrong. Please refresh the page, or
    try to login again.
  </p>
);

const SignupText: React.FC<{ signupState: SIGNED_UP_STATE }> = ({
  signupState,
}) => {
  switch (signupState) {
    case SIGNED_UP_STATE.NOT_LOADED:
      return <p>WE'LL BE LOADING SOON 🐵</p>;
    case SIGNED_UP_STATE.LOADING:
      return <p>LOADING 🐵</p>;
    case SIGNED_UP_STATE.NOT_SIGNED_UP:
      return <NotSignedUp />;
    case SIGNED_UP_STATE.SIGNED_UP:
      return <SignedUp />;
    case SIGNED_UP_STATE.ERROR:
      return <SignupError />;
  }
};

export default BuddyProject;
