import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../../UserContext";
import {
  initDb,
  buddyProjectSignup,
  fetchBuddyProjectSignup,
  BuddyProjectSignup,
} from "./buddyprojectFirebase";
import "./BuddyProject.scss";
import Footer from "../../components/Footer/Footer";

import BuddyProjectLogo from "../../assets/buddyproject_logo.svg";
import IDiscordUser from "../../types/User";

import { howToJoin, whatNext, howItWorks } from "./copy";

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

const Signup: React.FC<{ user: IDiscordUser | undefined }> = ({ user }) => {
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

    if (user === undefined) {
      // Short circuit this process if the user is not signed in.
      setCurrentSignup(null);
      setSignupState(SIGNED_UP_STATE.NOT_SIGNED_UP);
      return;
    }

    setSignupState(SIGNED_UP_STATE.LOADING);

    fetchBuddyProjectSignup(user.id)
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
    <div>
      {user === undefined ? (
        <NotLoggedIn />
      ) : (
        <>
          <header>
            <h3>Hi {user.username}!</h3>
            <p>
              Or should I call you {`${user.username}#${user.discriminator}`}?
            </p>
          </header>
          <SignupText signupState={signupState} />
          {signupState === SIGNED_UP_STATE.NOT_SIGNED_UP && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buddyProjectSignup(user.username, user.username, user.id)
                  .then(() => setSignupState(SIGNED_UP_STATE.SIGNED_UP))
                  .catch((err) => {
                    setSignupState(SIGNED_UP_STATE.ERROR);
                    setError(err);
                  });
              }}
            >
              <button type="submit" className="self-center">
                GIVE ME A BUDDY
              </button>
            </form>
          )}
          {signupState === SIGNED_UP_STATE.ERROR && <p>Error: {error}</p>}
        </>
      )}
    </div>
  );
};

const InitialContent = () => (
  <div className="column-center">
    <div className="buddy-project-logo">
      <BuddyProjectLogo />
    </div>
    <div className="buddy-project-text">
      Great things come to those who are willing to risk rejection and put
      themselves out there.
    </div>
  </div>
);

const BuddyProject: React.FC<{}> = () => {
  const signupRef = React.createRef() as React.RefObject<HTMLDivElement>;

  const { user } = React.useContext(UserContext);

  const scrollToAction = () => {
    const yOffset = -(
      document.querySelector(".nav-bar")?.getBoundingClientRect()?.height ?? 100
    );
    const y =
      (signupRef.current?.getBoundingClientRect()?.top ?? 0) +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const userCtx = React.useContext(UserContext);

  return (
    <>
      <NavBar fixed />
      <div className="column-center">
        <div className="column-center buddy-project-top">
          <div></div>
          {/* div required here to have space-between sort everything out */}
          <InitialContent />
          <div className="scroll-for-more column-center">
            GET INVOLVED
            <div className="expand-container">
              <IoIosArrowDown onClick={scrollToAction} size={20} />
            </div>
          </div>
        </div>

        <div ref={signupRef} className="buddy-project-bottom column-center">
          <SignupProcess />
        </div>
      </div>
      <Footer />
    </>
  );
};

const SignupWelcome: React.FC<{ username?: string }> = ({ username }) => {
  const hi = (username ? " " : "") + (username ?? "");

  return (
    <div className="column buddy-project-process-welcome">
      <div className="buddy-project-process-header">
        Find a stranger<div className="blue">Discover a friend</div>
      </div>
      <div className="column">
        <div className="buddy-project-process-title">
          Hi
          <div className="inline-blue">{hi}</div>!
        </div>
        <div className="buddy-project-process-introduction">
          An opportunity to get to know a person miles away from you, building a
          new friendship, and discovering a new way of living, what’s not to
          like?
        </div>
      </div>
    </div>
  );
};

const ProcessStep: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="column buddy-project-process-step">
      <div className="buddy-project-process-title">{title}</div>
      {children}
    </div>
  );
};

const SignupProcess: React.FC<Partial<BuddyProjectSignup>> = (props) => {
  return (
    <div className="column buddy-project-process">
      <div className="buddy-project-process-blockone column">
        <SignupWelcome />
        <img src="" height="340" width="440" />
      </div>
      <div className="column buddy-project-process-steps">
        <ProcessStep title="How do I join?" children={howToJoin} />
        <ProcessStep title="What happens next?" children={whatNext} />
        <ProcessStep title="How will it work?" children={howItWorks} />
      </div>
      <button className="inverted self-center">FIND YOUR BUDDY</button>
    </div>
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
    Hey there! Something seems to have gone wrong. Please refresh the page, orf
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
