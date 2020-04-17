import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

const DoubleVerticalLayout: React.FC<LayoutProps> = ({ images }) => {
  const [, chosenVerticals, otherImages] = splitImages(images, 0, 2);

  return (
    <div className="row layout-row">
      <PhotoWrapper className="w-33" src={chosenVerticals[0].src} />
      <div className="column w-33">
        <PhotoWrapper className="h-50" src={otherImages[0].src} />
        <PhotoWrapper className="h-50" src={otherImages[1].src} />
      </div>
      <PhotoWrapper className="w-33" src={chosenVerticals[1].src} />
    </div>
  );
};

export default DoubleVerticalLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 0,
  totalImages: 4,
  verticalImages: 2,
};
