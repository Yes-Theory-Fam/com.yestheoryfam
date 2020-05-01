import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import "./DoubleVerticalLayout.scss";

const DoubleVerticalLayout: React.FC<LayoutProps> = ({ images }) => {
  const [, chosenVerticals, otherImages] = splitImages(images, 0, 2);

  return (
    <div className="dv-layout layout-row">
      <PhotoWrapper className="tall" src={chosenVerticals[0].src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
      <PhotoWrapper className="tall-right" src={chosenVerticals[1].src} />
    </div>
  );
};

export default DoubleVerticalLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 0,
  totalImages: 4,
  verticalImages: 2,
};
