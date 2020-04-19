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
import { howToJoin, whatNext, howItWorks, NotSignedUp, SignedUp, SignupError, NotLoggedIn } from "./copy";
import CutestBotEver from "../../assets/yesbot-yougotmail_bluetint.png";
import { DiscordApi } from "../../index";
import { SuccessModalToDiscord } from './SuccessfulSignUpModal';

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

    fetchBuddyProjectSignup(user?.id)
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
                  buddyProjectSignup(user?.username, user?.username, user?.id)
                    .then(() =>
                    // After they've been registered to Firebase, send them to Discord. 
                    {
                      if (registerToDiscord(user)) {
                        setSignupState(SIGNED_UP_STATE.SIGNED_UP)
                      } else {
                        setSignupState(SIGNED_UP_STATE.NOT_SIGNED_UP);
                      }
                    })
                    .catch((err) => {
                      setSignupState(SIGNED_UP_STATE.ERROR);
                      setError(err);
                    });
                }}
              >
                <button type="submit" className="self-center" style={{ marginTop: '5%' }}>
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

const registerToDiscord = async (user: IDiscordUser | undefined) => {
  const access_token = localStorage.getItem("access_token");
  const guild_id = process.env.REACT_APP_GUILD_ID;
  const roles = [process.env.REACT_APP_BUDDY_PROJECT_ROLE_ID]
  const payload = { access_token, roles }
  const response = await DiscordApi("bot").put(`/guilds/${guild_id}/members/${user?.id}`, payload);
  console.log('Response status: ', response.status);
  if (response.status === 200) {
    return true;
  }
  return false;
}


const BuddyProject: React.FC<{}> = () => {
  const signupRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [bpStatus, setBPStatus] = React.useState(SIGNED_UP_STATE.NOT_SIGNED_UP);
  const [error, setError] = React.useState('');

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

  React.useEffect(() => {
    initDb();
    buddyProjectSignup(user?.username || '', user?.username || '', user?.id || '')
      .then(() => {
        if (registerToDiscord(user)) {
          setBPStatus(SIGNED_UP_STATE.SIGNED_UP);
        } else {
          setBPStatus(SIGNED_UP_STATE.NOT_SIGNED_UP);
        }
      })
      .catch((err) => {
        console.log('ERror with Buddy proj: ', err.message);
        setBPStatus(SIGNED_UP_STATE.ERROR);
        setError(err.message);
      });
  }, [user, setBPStatus])

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
          <SignupProcess user={user} bpSignupStatus={bpStatus} />
        </div>
        {/* {error !== '' ? <span>{error}</span> : ''} */}
      </div>
      <Footer />
    </>
  );
};

const SignupWelcome: React.FC<{ user: IDiscordUser | undefined }> = ({
  user,
}) => {
  const hi = user ? ` ${user.username}#${user.discriminator}` : "";

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

const renderBPNextStepButton =
  (
    user: IDiscordUser | undefined,
    bpSignupStatus: SIGNED_UP_STATE,
    setShowSignUpForm: { (val: boolean): void },
  ) => {
    switch (bpSignupStatus) {
      case 2:
        // SIGNED_UP
        console.log("We're here!")
        return (
          <a className='button inverted self-center disabled' >
            You've already signed up!
          </a>
        )
      case 3:
        // NOT_SIGNED_UP
        // TODO: This should open the modal
        return (
          <button onClick={() => setShowSignUpForm(true)} className='button inverted self-center'>
            Sign up!
          </button>
        )
      default:
        return (
          <a href='/auth/discord' className='button inverted self-center'>
            Login with Discord!
          </a>
        );
    }
  }

const SignupProcess: React.FC<{ user: IDiscordUser | undefined, bpSignupStatus: SIGNED_UP_STATE }> = ({
  bpSignupStatus,
  user,
}) => {
  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const [showToDiscordModal, setShowToDiscordModal] = React.useState(true);
  const setShowSignUpFormMethod = (val: boolean) => {
    setShowSignUpForm(val);
  }

  return (
    <div className="column buddy-project-process">
      <div className="buddy-project-process-blockone column">
        <SignupWelcome user={user} />
        <div className="buddy-project-process-yesbot centered-content">
          <img src={CutestBotEver} />
        </div>
      </div>
      <div className="column buddy-project-process-steps">
        <ProcessStep title="How do I join?" children={howToJoin} />
        <ProcessStep title="What happens next?" children={whatNext} />
        <ProcessStep title="How will it work?" children={howItWorks} />
      </div>
      {renderBPNextStepButton(user, bpSignupStatus, setShowSignUpFormMethod)}
      {
        bpSignupStatus === 2 && showToDiscordModal &&
        < SuccessModalToDiscord onClose={() => setShowToDiscordModal(false)} username={user?.username} />
      }
      <br />
      {showSignUpForm && <Signup user={user} />}
    </div >
  );
};

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
