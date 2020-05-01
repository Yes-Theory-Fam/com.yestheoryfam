import * as React from "react";

import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import "./VerticalLeftLayout.scss";

const VerticalLeftLayout: React.FC<LayoutProps> = ({ images }) => {
  const [[chosenHorizontal], [chosenVertical], otherImages] = splitImages(
    images,
    1,
    1
  );

  return (
    <div className="vl-layout layout-row">
      <PhotoWrapper className="tall" src={chosenVertical.src} />
      <PhotoWrapper className="long" src={chosenHorizontal.src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
    </div>
  );
};

export default VerticalLeftLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 1,
  verticalImages: 1,
  totalImages: 4,
};
