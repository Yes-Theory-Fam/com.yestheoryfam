import * as React from "react";
import { IoMdClose } from "react-icons/io";

export const SuccessModalToDiscord: React.FC<{ onClose: () => void, username: string | undefined, }> = ({ onClose, username }) => {
    return (
        <div className="success-modal">
            <div className="success-modal-body">
                <div className="centered-content success-modal-close-button" onClick={onClose}>
                    <IoMdClose size={22} />
                </div>
                <div className='success-modal-text-content'>
                    Hi {username}! Looks like you have already signed up for Buddy Project.
                    <a className='button inverted self-center' href='https://discordapp.com/channels/449984633342525462/449984633908625409'>
                        Continue to Discord!
                    </a>
                </div>
            </div>
        </div>
    )
};