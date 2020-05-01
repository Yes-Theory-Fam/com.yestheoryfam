import * as React from "react";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import { splitImages } from "../../../utils";

import "./DoubleColumnLayout.scss";

const DoubleColumnLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal, , otherImages] = splitImages(images, 2, 0);

  return (
    <div className="dc-layout layout-row">
      <PhotoWrapper className="tall-1" src={otherImages[0].src} />
      <PhotoWrapper src={selectedHorizontal[0].src} />
      <PhotoWrapper src={selectedHorizontal[1].src} />
      <PhotoWrapper className="tall-2" src={otherImages[1].src} />
    </div>
  );
};

export default DoubleColumnLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4,
};
