import * as React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import './BuddyProject.scss';
import Footer from "../../components/Footer/Footer";

const BuddyModal: React.FC<{onClose: () => void}> = ({onClose}) => {
    return (
      <div className="buddy-project-modal">
        <div style={{ height: "100%", width: "100%" }} className="column-center">
      <CloseButton onClick={onClose} />
      <div className="upload-header">Find a stranger, discover a friend.</div>
    </div>
        </div>
    );
  };
  
  const InitialContent: React.FC<{ onButtonClick: () => void }> = ({
    onButtonClick,
  }) => {
    return (
      <div className="column-center photo-wall-top-content">
        <div className="page-header">
          BUDDY<div className="inline-blue">PROJECT</div>
        </div>
        <div className="buddy-project-text">
            Great things come to those who are willing to risk rejection and put themselves out there.
        </div>
        <button className="button buddy-project-entry" onClick={onButtonClick}>
          GET INVOLVED
        </button>
      </div>
    );
  };

  const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
      <div className="centered-content upload-close-button" onClick={onClick}>
        <IoMdClose size={22} />
      </div>
    );
  };


const BuddyProject: React.FC<{}> = () => {
    // This should be temporary until state management is done properly. I am just pretty sure I need a state here to handle loading of the images.
    const [builtLayouts, setLayouts] = React.useState<Array<React.ReactNode>>([]);
    const [showModal, setShowModal] = React.useState(false);
  
  
    return (
      <>
        <NavBar fixed classNames={showModal ? "blur" : ""}/>
        {showModal && <BuddyModal onClose={() => setShowModal(false)} />}
        <div className={`column-center ${showModal ? "blur" : ""}`}>
          <div className="column-center photo-wall-top">
            <div></div>{/* div required here to have space-between sort everything out */}
            <InitialContent onButtonClick={() => setShowModal(true)} />
            <div className="scroll-for-more column-center">
              SEE ALL PHOTOS
              <div className="expand-container">
                <IoIosArrowDown size={20} />
              </div>
            </div>
          </div>
  
          <div className="photo-wall-list">
            <div className="column">{builtLayouts}</div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
export default BuddyProject;
