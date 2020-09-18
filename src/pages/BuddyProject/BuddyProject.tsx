import * as React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { UserContext } from "../../UserContext";
import { initDb, buddyProjectSignup, fetchBuddyProjectSignup } from "./buddyprojectFirebase";
import styles from "./BuddyProject.module.scss";
import classNames from "classnames";

import BuddyProjectLogo from "../../assets/buddyproject_logo.svg";
import IDiscordUser from "../../types/User";
import { howToJoin, whatNext, howItWorks } from "./copy";
import CutestBotEver from "../../assets/yesbot-yougotmail_bluetint.png";
import BackendApi from "../../apis/backend";
import { SuccessModalToDiscord } from "./SuccessfulSignUpModal";
import { Link } from "react-router-dom";

enum SIGNED_UP_STATE {
  NOT_LOADED,
  LOADING,
  SIGNED_UP,
  NOT_SIGNED_UP,
  ERROR,
}

const InitialContent = () => (
  <div className="column-center">
    <div className={styles.buddyProjectLogo}>
      <BuddyProjectLogo />
    </div>
    <div className={styles.buddyProjectText}>
      Great things come to those who are willing to risk rejection and put themselves out there.
    </div>
  </div>
);

const registerToDiscord = async () => {
  const response = await BackendApi().post(`/bot-actions/add-user`);
  if (response.status === 200) {
    return true;
  }
  return false;
};

const BuddyProject: React.FC<{}> = () => {
  const signupRef = React.createRef() as React.RefObject<HTMLDivElement>;
  const [bpStatus, setBPStatus] = React.useState(SIGNED_UP_STATE.LOADING);

  const { user } = React.useContext(UserContext);

  // TODO fix selector - done when moving this to standalone component
  const scrollToAction = () => {
    const yOffset = -(document.querySelector(".nav-bar")?.getBoundingClientRect()?.height ?? 100);
    const y = (signupRef.current?.getBoundingClientRect()?.top ?? 0) + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  React.useEffect(() => {
    initDb();
    if (user && SIGNED_UP_STATE.LOADING) {
      fetchBuddyProjectSignup(user.id).then((signup) => {
        setBPStatus(signup ? SIGNED_UP_STATE.SIGNED_UP : SIGNED_UP_STATE.NOT_SIGNED_UP);
      });
    }
  }, [user, setBPStatus]);

  return (
    <div className="column-center">
      <div className={classNames(styles.buddyProjectTop, "column-center")}>
        <div />
        {/* div required here to have space-between sort everything out */}
        <InitialContent />
        <div onClick={scrollToAction} className={classNames(styles.scrollForMore, "column-center")}>
          GET INVOLVED
          <div className={styles.expandContainer}>
            <IoIosArrowDown size={20} />
          </div>
        </div>
      </div>
      <div ref={signupRef} className={classNames(styles.buddyProjectBottom, "column-center")}>
        <SignupProcess user={user} bpSignupStatus={bpStatus} setSignupStatus={setBPStatus} />
      </div>
    </div>
  );
};

const SignupWelcome: React.FC<{ user: IDiscordUser | undefined }> = ({ user }) => {
  const hi = user ? ` ${user.username}#${user.discriminator}` : "";

  return (
    <div className={classNames(styles.buddyProjectProcessWelcome, "column")}>
      <div className={styles.buddyProjectProcessHeader}>
        Find a stranger<div className="blue">Discover a friend</div>
      </div>
      <div className="column">
        <div className={styles.buddyProjectProcessTitle}>
          Hi
          <div className="inline-blue">{hi}</div>!
        </div>
        <div className={styles.buddyProjectProcessIntroduction}>
          An opportunity to get to know a person miles away from you, building a new friendship, and discovering a new
          way of living, what’s not to like?
        </div>
      </div>
    </div>
  );
};

const ProcessStep: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className={classNames(styles.buddyProjectProcessStep, "column")}>
      <div className={styles.buddyProjectProcessTitle}>{title}</div>
      {children}
    </div>
  );
};

const buddyProjectRegister = (user: IDiscordUser, setSignupState: (val: SIGNED_UP_STATE) => void) => {
  const { username, id } = user;
  buddyProjectSignup(username, username, id)
    .then(() =>
      // After they've been registered to Firebase, send them to Discord.
      {
        if (registerToDiscord()) {
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
      return <a className={classNames(styles.selfCenter, "button inverted disabled")}>You've already signed up!</a>;
    case SIGNED_UP_STATE.NOT_SIGNED_UP:
      // IF USER LOGGED IN -> SIGN UP
      // IF USER NOT LOGGED IN -> LOGIN WITH DISCORD
      // MARKER FOR LATER (SIGNUP BUTTON)
      return user ? (
        <button
          onClick={() => {
            buddyProjectRegister(user, setSignupStatus);
          }}
          className={classNames(styles.selfCenter, "button inverted")}
        >
          Sign up!
        </button>
      ) : (
        <Link to="/auth/discord" className={classNames(styles.selfCenter, "button inverted")}>
          Login with Discord!
        </Link>
      );
    default:
      return (
        // TODO Link
        <a href="/auth/discord" className={classNames(styles.selfCenter, "button inverted")}>
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
    <div className={classNames(styles.buddyProjectProcess, "column")}>
      <div className={classNames(styles.buddyProjectProcessBlockone, "column")}>
        <SignupWelcome user={user} />
        <div className={classNames(styles.buddyProjectProcessYesbot, "centered-content")}>
          <img src={CutestBotEver} />
        </div>
      </div>
      <div className={classNames(styles.buddyProjectProcessSteps, "column")}>
        <ProcessStep title="How do I join?" children={howToJoin} />
        <ProcessStep title="What happens next?" children={whatNext} />
        <ProcessStep title="How will it work?" children={howItWorks} />
      </div>
      {renderBPNextStepButton(user, bpSignupStatus, setSignupStatus)}
      {bpSignupStatus === SIGNED_UP_STATE.SIGNED_UP && showToDiscordModal && user && (
        <SuccessModalToDiscord onClose={() => setShowToDiscordModal(false)} username={user.username} />
      )}
    </div>
  );
};

export default BuddyProject;
