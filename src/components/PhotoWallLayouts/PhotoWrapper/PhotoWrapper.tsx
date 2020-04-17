import * as React from "react";
import "./PhotoWrapper.scss";
// CSS for react-image-lightbox already imported in PhotoWall.tsx because once is enough
import Lightbox from "react-image-lightbox";

const PhotoWrapper: React.FC<{
  className: string;
  src: string | undefined;
}> = ({ className, src }) => {
  const [showsInModal, setShowsInModal] = React.useState(false);

  const showInModal = () => setShowsInModal(true);
  const closeModal = () => setShowsInModal(false);

  return (
    <div className={className} onClick={showInModal}>
      {!src && <></>}
      {src && <img className="fit-container" src={src} />}
      {src && showsInModal && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={closeModal}
          clickOutsideToClose
          imageLoadErrorMessage="Image could not be loaded"
        />
      )}
    </div>
  );
};

export default PhotoWrapper;
