import * as React from "react";

import layouts, { OneFourLayout } from "../../components/PhotoWallLayouts";
import { randomInt } from "../../utils";

import "./PhotoWall.scss";
import "react-image-lightbox/style.css";

import { PhotoProps } from "../../components/PhotoWallLayouts/PhotoWallLayoutTypes";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import UploadDropzone from "../../components/UploadDropzone/UploadDropzone";

import { IoIosArrowDown } from 'react-icons/io';

const UploadModal: React.FC<{onClose: () => void}> = ({onClose}) => {
  return (
    <div className="photo-wall-upload-modal">
      <div className="photo-wall-upload-modal-dropzone">
        <UploadDropzone onClose={onClose}/>
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
        PHOTO<div className="inline-blue">WALL</div>
      </div>
      <div className="photo-wall-top-text">
        Become a part of the story by sharing your photographs from the last
        event on our photowall. The more people can see it, the more people will
        get involved next time. Make the FOMO be real!
      </div>
      <button className="button" onClick={onButtonClick}>
        BE PART OF THE STORY
      </button>
    </div>
  );
};

const PhotoWall: React.FC<{}> = () => {
  // This should be temporary until state management is done properly. I am just pretty sure I need a state here to handle loading of the images.
  const [builtLayouts, setLayouts] = React.useState<Array<React.ReactNode>>([]);
  const [showModal, setShowModal] = React.useState(false);

  if (randomImages.length > 0) {
    getNextBuiltLayout(randomImages)
      .then((newLayout) => {
        const newLayouts: Array<React.ReactNode> = Array.from(builtLayouts);
        newLayouts.push(newLayout);
        return newLayouts;
      })
      .then((newLayouts) => setLayouts(newLayouts));
  }

  return (
    <>
      <NavBar fixed classNames={showModal ? "blur" : ""}/>
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
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

const getNextBuiltLayout = async (
  images: Array<string>
): Promise<React.ReactNode> => {
  const availableLayouts = layouts.filter(
    ({ props }) => props.totalImages <= images.length
  );

  console.log("Filtered layouts: ");
  console.log(availableLayouts);

  // Using that layout makes it easy to get a proper end to the list based on how the layout is structured
  // It also doesn't cause chaos or strange alignments because all of the images end up roughly square in the final layout anyway
  if (availableLayouts.length === 0) {
    const restLayout = (
      <OneFourLayout
        images={images.map((src) => ({ src, orientation: "square" }))}
      />
    );
    images.length = 0;
    return restLayout;
  }

  const choice = randomInt(0, availableLayouts.length);
  const layout = availableLayouts[choice];

  if (layout === undefined) {
    console.log("Layout object undefined! Relevant values include: ");
    console.log(
      `availableLayouts: ${availableLayouts}, choice: ${choice}, images remaining: ${images.length}`
    );
    console.log("Cleaning images and returning to avoid issues downstream!");
    images.length = 0;
    return;
  }

  const { totalImages, horizontalImages, verticalImages } = layout.props;
  const { LayoutComponent } = layout;

  const pickedImages = images.splice(0, totalImages);

  // Skip checking orientation when all images are squared anyway.
  // We also fill up the orientation key with value square because it doesn't matter but is required for the signature.
  if (horizontalImages === 0 && verticalImages === 0) {
    const mockProps: Array<PhotoProps> = pickedImages.map((image) => ({
      orientation: "square",
      src: image,
    }));
    return <LayoutComponent images={mockProps} />;
  }

  console.log(`Loading orientations for ${pickedImages.length} images...`);

  const photoProps = await Promise.all(
    pickedImages.map((img) => getOrientation(img))
  );

  const pickedHorizontal = photoProps.filter(
    ({ orientation }) => orientation === "horizontal"
  ).length;

  const pickedVertical = photoProps.filter(
    ({ orientation }) => orientation === "vertical"
  ).length;

  if (
    pickedHorizontal >= horizontalImages &&
    pickedVertical >= verticalImages
  ) {
    return <LayoutComponent images={photoProps} />;
  }

  const availableOrientationLayouts = availableLayouts
    .filter(({ props }) => props.totalImages === pickedImages.length)
    .filter(({ props }) => props.horizontalImages <= pickedHorizontal)
    .filter(({ props }) => props.verticalImages <= pickedVertical);

  // I don't think this should ever happen with the current set of layouts. But better be safe than sorry.
  if (availableOrientationLayouts.length === 0) {
    images.unshift(...pickedImages);
    return <></>;
  }

  const orientationChoice = randomInt(0, availableOrientationLayouts.length);
  const orientationLayout = availableOrientationLayouts[orientationChoice];

  return <orientationLayout.LayoutComponent images={photoProps} />;
};

// Data-use-wise I probably shouldn't just discard those loaded images.
// Unless they are cached. In which case I would have won. Which would be nice.
const getOrientation = (url: string): Promise<PhotoProps> => {
  const orientationPromise: Promise<PhotoProps> = new Promise(
    (resolve, reject) => {
      const img = new Image();

      img.addEventListener("load", function () {
        const height = this.naturalHeight;
        const width = this.naturalWidth;

        if (height === width)
          return resolve({ src: url, orientation: "square" });
        if (height > width)
          return resolve({ src: url, orientation: "vertical" });
        if (height < width)
          return resolve({ src: url, orientation: "horizontal" });

        console.log(`height: ${height} - width: ${width} - url: ${url}`);
      });

      img.src = url;

      // setTimeout(() => reject(`Timeout loading image with URL ${url}!`), 2000);
    }
  );

  return orientationPromise;
};

const randomImages = Array(27)
  .fill(undefined)
  .map(
    () => `https://picsum.photos/${randomInt(260, 900)}/${randomInt(260, 900)}`
  );

// const randomImages = [
//   "https://i.picsum.photos/id/425/431/619.jpg",
//   "https://i.picsum.photos/id/856/697/434.jpg",
//   "https://i.picsum.photos/id/409/393/621.jpg",
//   "https://i.picsum.photos/id/551/806/760.jpg",
// ];

export default PhotoWall;
