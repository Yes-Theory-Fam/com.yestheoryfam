import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { SuccessfulSignup } from "./copy";

import BPLogo from "../../assets/buddyproject_logo.svg";

export const SuccessModalToDiscord: React.FC<{
  onClose: () => void;
  username: string;
}> = ({ onClose, username }) => {
  return (
    <div className="success-modal centered-content">
      <div className="success-modal-body column-center">
        <div className="success-modal-top row">
          <div className="success-modal-logo">
            <BPLogo />
          </div>
          <div>
            <div className="centered-content success-modal-close-button" onClick={onClose}>
              <IoMdClose size={22} />
            </div>
          </div>
        </div>

        <div className="success-modal-text-content">
          <SuccessfulSignup user={username} />
          <a
            className="button inverted self-center"
            href="https://discord.com/channels/449984633342525462/701717612001886228"
          >
            Continue to Discord!
          </a>
        </div>
      </div>
    </div>
  );
};
