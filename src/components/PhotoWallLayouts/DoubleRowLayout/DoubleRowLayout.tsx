import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import "./DoubleRowLayout.scss";

const DoubleRowLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal, , otherImages] = splitImages(images, 2, 0);

  return (
    <div className="dr-layout layout-row">
      <PhotoWrapper className="long-1" src={selectedHorizontal[0].src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
      <PhotoWrapper className="long-2" src={selectedHorizontal[1].src} />
    </div>
  );
};

export default DoubleRowLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4,
};
