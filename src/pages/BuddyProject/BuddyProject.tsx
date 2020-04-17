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

const Signup: React.FC<BuddyProjectSignup> = ({
  discordUserId,
  discordUsername,
  displayName,
}) => {
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

    fetchBuddyProjectSignup(discordUserId)
      .then(setCurrentSignup)
      .catch((e) => setError(e));
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
          {currentSignup === undefined && (
            <> Hang on a sec... I'm checking if you're already signed up. </>
          )}
          {currentSignup !== undefined && currentSignup !== null && (
            <> You're already signed up silly! </>
          )}
          {currentSignup === null && (
            <>
              <p>
                Click this button to sign up for the buddy project and we'll
                assign you a buddy real soon! (add more details about when etc)
              </p>
              <p>
                After you've been assigned a buddy, you will be able to see who
                it is and how to contact them here.
              </p>
              <p>Feel free to check back on this page for any updates.</p>
              {error !== "" && <div>Seems like something went wrong! 🤔</div>}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  buddyProjectSignup(
                    discordUsername,
                    displayName,
                    discordUserId
                  );
                }}
              >
                <button type="submit" className="button buddy-project-entry">
                  GIVE ME A BUDDY
                </button>
              </form>
            </>
          )}
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
              <IoIosArrowDown size={20} />
            </div>
          </div>
        </div>
      </div>

      <Signup
        discordUsername="YESBOT#0001"
        displayName="YesBot"
        discordUserId="614101602046836776"
      />
      <Footer />
    </>
  );
};

export default BuddyProject;
