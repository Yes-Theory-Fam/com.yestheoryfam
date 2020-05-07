import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../../UserContext";
import {
  initDb,
  buddyProjectSignup,
  fetchBuddyProjectSignup,
} from "./buddyprojectFirebase";
import "./BuddyProject.scss";
import Footer from "../../components/Footer/Footer";

import BuddyProjectLogo from "../../assets/buddyproject_logo.svg";
import IDiscordUser from "../../types/User";
import { howToJoin, whatNext, howItWorks } from "./copy";
import CutestBotEver from "../../assets/yesbot-yougotmail_bluetint.png";
import DiscordApi from "../../apis/discord";
import { SuccessModalToDiscord } from "./SuccessfulSignUpModal";
import { Link } from "react-router-dom";

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
  const roles = [process.env.REACT_APP_BUDDY_PROJECT_ROLE_ID];
  const payload = { access_token, roles };
  const response = await DiscordApi("bot").put(
    `/guilds/${guild_id}/members/${user?.id}`,
    payload
  );
  console.log("Response status: ", response.status);
  if (response.status === 200) {
    return true;
  }
  return false;
};

const isUserInGuild = (user: IDiscordUser) => {
  try {
    DiscordApi("bot").get(
      `/guilds/${process.env.REACT_APP_GUILD_ID}/members/${user?.id}`
    );
    return true;
  } catch {
    return false;
  }
};

const BuddyProject: React.FC<{}> = () => {
  const signupRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [bpStatus, setBPStatus] = React.useState(SIGNED_UP_STATE.LOADING);
  const [guildStatus, setGuildStatus] = React.useState(
    LOGGED_IN_STATE.NOT_LOGGED_IN
  );

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
    if (user && SIGNED_UP_STATE.LOADING) {
      fetchBuddyProjectSignup(user.id).then((signup) => {
        setBPStatus(
          signup ? SIGNED_UP_STATE.SIGNED_UP : SIGNED_UP_STATE.NOT_SIGNED_UP
        );
      });
    }
  }, [user, setBPStatus]);

  return (
    <>
      <NavBar fixed />
      <div className="column-center">
        <div className="column-center buddy-project-top">
          <div></div>
          {/* div required here to have space-between sort everything out */}
          <InitialContent />
          <div
            onClick={scrollToAction}
            className="scroll-for-more column-center"
          >
            GET INVOLVED
            <div className="expand-container">
              <IoIosArrowDown size={20} />
            </div>
          </div>
        </div>
        <div ref={signupRef} className="buddy-project-bottom column-center">
          <SignupProcess
            user={user}
            bpSignupStatus={bpStatus}
            setSignupStatus={setBPStatus}
          />
        </div>
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

const buddyProjectRegister = (
  user: IDiscordUser,
  setSignupState: (val: SIGNED_UP_STATE) => void
) => {
  const { username, id } = user;
  buddyProjectSignup(username, username, id)
    .then(() =>
      // After they've been registered to Firebase, send them to Discord.
      {
        if (registerToDiscord(user)) {
          setSignupState(SIGNED_UP_STATE.SIGNED_UP);
        } else {
          setSignupState(SIGNED_UP_STATE.NOT_SIGNED_UP);
        }
      }
    )
    .catch((err) => {
      setSignupState(SIGNED_UP_STATE.ERROR);
    });
};

const renderBPNextStepButton = (
  user: IDiscordUser | undefined,
  bpSignupStatus: SIGNED_UP_STATE,
  setSignupStatus: (val: SIGNED_UP_STATE) => void
) => {
  switch (bpSignupStatus) {
    case SIGNED_UP_STATE.SIGNED_UP:
      // SIGNED_UP
      return (
        <a className="button inverted self-center disabled">
          You've already signed up!
        </a>
      );
    case SIGNED_UP_STATE.NOT_SIGNED_UP:
      // IF USER LOGGED IN -> SIGN UP
      // IF USER NOT LOGGED IN -> LOGIN WITH DISCORD
      // MARKER FOR LATER (SIGNUP BUTTON)
      return user ? (
        <button
          onClick={() => {
            buddyProjectRegister(user, setSignupStatus);
          }}
          className="button inverted self-center"
        >
          Sign up!
        </button>
      ) : (
        <Link to="/auth/discord" className="button inverted self-center">
          Login with Discord!
        </Link>
      );
    default:
      return (
        <a href="/auth/discord" className="button inverted self-center">
          Login with Discord!
        </a>
      );
  }
};

const SignupProcess: React.FC<{
  user: IDiscordUser | undefined;
  bpSignupStatus: SIGNED_UP_STATE;
  setSignupStatus: (val: SIGNED_UP_STATE) => void;
}> = ({ setSignupStatus, bpSignupStatus, user }) => {
  const [showToDiscordModal, setShowToDiscordModal] = React.useState(true);

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
      {renderBPNextStepButton(user, bpSignupStatus, setSignupStatus)}
      {bpSignupStatus === SIGNED_UP_STATE.SIGNED_UP &&
        showToDiscordModal &&
        user && (
          <SuccessModalToDiscord
            onClose={() => setShowToDiscordModal(false)}
            username={user.username}
          />
        )}
    </div>
  );
};

export default BuddyProject;
