import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import {splitImages} from "../../../utils";

const DoubleRowLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal,, otherImages] = splitImages(images, 2, 0);

  return (
    <div className="row layout-row">
      <div className="column w-100">
        <div className="row h-50">
          <PhotoWrapper className="w-66" src={selectedHorizontal[0].src} />
          <PhotoWrapper className="w-33" src={otherImages[0].src} />
        </div>
        <div className="row h-50">
          <PhotoWrapper className="w-33" src={otherImages[1].src} />
          <PhotoWrapper className="w-66" src={selectedHorizontal[1].src} />
        </div>
      </div>
    </div>
  );
};

export default DoubleRowLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4
};
