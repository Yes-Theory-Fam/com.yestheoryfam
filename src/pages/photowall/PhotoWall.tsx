import * as React from "react";
import { useEffect } from "react";

import layouts, { OneFourLayout } from "../../components/PhotoWallLayouts";
import { randomInt } from "../../utils";

import "./PhotoWall.scss";
import "react-image-lightbox/style.css";

import { PhotoProps } from "../../components/PhotoWallLayouts/PhotoWallLayoutTypes";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import UploadDropzone from "../../components/UploadDropzone/UploadDropzone";

import { IoIosArrowDown } from "react-icons/io";
import BackendApi from "../../apis/backend";

const UploadModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="upload-modal">
      <div className="upload-modal-dropzone">
        <UploadDropzone onClose={onClose} />
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
      <button onClick={onButtonClick}>BE PART OF THE STORY</button>
    </div>
  );
};

interface PhotowallPageResult {
  page: number;
  hasNext: boolean;
  imageIds: string[];
}

interface LastPhotowallPageResult {
  page: number;
  hasNext: boolean;
}

const PhotoWall: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [builtLayouts, setLayouts] = React.useState<Array<React.ReactNode>>([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [remainingImages, setRemainingImages] = React.useState<string[]>([]);
  const [lastGetResult, setLastGetResult] = React.useState<
    LastPhotowallPageResult
  >();

  useEffect(() => {
    fetchData().catch((e) => console.log("Fuck", e));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const fetchData = async () => {
    console.log(`lastGetResult:`, lastGetResult);
    const pageToGet =
      lastGetResult?.page !== null && lastGetResult?.page !== undefined
        ? lastGetResult.page + 1
        : 0;
    console.log("pageToGet: ", pageToGet);
    getPage(pageToGet).then((page) => {
      const backend = process.env.REACT_APP_BACKEND_URL;
      const urls = page.imageIds.map((id) => `${backend}files/download/${id}`);
      setRemainingImages([...remainingImages, ...urls]);
      console.log(page.page);
      setLastGetResult(page);
    });
  };

  // Initial load
  useEffect(() => {
    if (!isFetching || !lastGetResult?.hasNext) return;
    fetchData().catch((e) => console.log("Fuck", e));
  }, [isFetching]);

  if (remainingImages.length > 0) {
    getNextBuiltLayout(remainingImages, setRemainingImages)
      .then((newLayout) => {
        const newLayouts: Array<React.ReactNode> = Array.from(builtLayouts);
        newLayouts.push(newLayout);
        return newLayouts;
      })
      .then((newLayouts) => setLayouts(newLayouts));
  }

  return (
    <>
      <NavBar fixed classNames={showModal ? "blur" : ""} />
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
      <div className={`column-center ${showModal ? "blur" : ""}`}>
        <div className="column-center photo-wall-top">
          <div></div>
          {/* div required here to have space-between sort everything out */}
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
        {isFetching && lastGetResult?.hasNext && (
          <div>Finding awesome pictures!</div>
        )}
        {isFetching && !lastGetResult?.hasNext && <div>End of the wall!</div>}
      </div>
      <Footer />
    </>
  );
};

const getNextBuiltLayout = async (
  images: Array<string>,
  setImages: React.Dispatch<React.SetStateAction<string[]>>
): Promise<React.ReactNode> => {
  // Shallow copy so we don't mess with the original array
  images = [...images];
  const availableLayouts = layouts.filter(
    ({ props }) => props.totalImages <= images.length
  );

  // Using that layout makes it easy to get a proper end to the list based on how the layout is structured
  // It also doesn't cause chaos or strange alignments because all of the images end up roughly square in the final layout anyway
  if (availableLayouts.length === 0) {
    const restLayout = (
      <OneFourLayout
        images={images.map((src) => ({ src, orientation: "square" }))}
      />
    );
    setImages([]);
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
    setImages([]);
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
    setImages(images);
    return <LayoutComponent images={mockProps} />;
  }

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
    setImages(images);
    return <LayoutComponent images={photoProps} />;
  }

  const availableOrientationLayouts = availableLayouts
    .filter(({ props }) => props.totalImages === pickedImages.length)
    .filter(({ props }) => props.horizontalImages <= pickedHorizontal)
    .filter(({ props }) => props.verticalImages <= pickedVertical);

  // I don't think this should ever happen with the current set of layouts. But better be safe than sorry.
  if (availableOrientationLayouts.length === 0) {
    images.unshift(...pickedImages);
    setImages(images);
    return <></>;
  }

  const orientationChoice = randomInt(0, availableOrientationLayouts.length);
  const orientationLayout = availableOrientationLayouts[orientationChoice];

  setImages(images);
  return <orientationLayout.LayoutComponent images={photoProps} />;
};

// Data-use-wise I probably shouldn't just discard those loaded images.
// Unless they are cached. In which case I would have won. Which would be nice.
const getOrientation = (url: string): Promise<PhotoProps> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener("load", function () {
      const height = this.naturalHeight;
      const width = this.naturalWidth;

      if (height === width) return resolve({ src: url, orientation: "square" });
      if (height > width) return resolve({ src: url, orientation: "vertical" });
      if (height < width)
        return resolve({ src: url, orientation: "horizontal" });

      console.log(`height: ${height} - width: ${width} - url: ${url}`);
    });

    img.src = url;

    // setTimeout(() => reject(`Timeout loading image with URL ${url}!`), 2000);
  });
};

const getPage = async (page = 0): Promise<PhotowallPageResult> => {
  const response = await BackendApi().get(`/photowall/images/${page}`);
  const test = { ...response.data, page: Number(response.data.page) };
  console.log(test);
  return test;
};

export default PhotoWall;
