import * as React from "react";

import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import {splitImages} from "../../../utils";

const VerticalLeftLayout: React.FC<LayoutProps> = ({ images }) => {
  const [[chosenHorizontal], [chosenVertical], otherImages] = splitImages(images, 1, 1);

  return (
    <div className="row layout-row">
      <PhotoWrapper className="w-33" src={chosenVertical.src} />
      <div className="column w-66">
        <PhotoWrapper className="h-50" src={chosenHorizontal.src} />
        <div className="row h-50">
          <PhotoWrapper className="w-50" src={otherImages[0].src} />
          <PhotoWrapper className="w-50" src={otherImages[1].src} />
        </div>
      </div>
    </div>
  );
};

export default VerticalLeftLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 1,
  verticalImages: 1,
  totalImages: 4
};
