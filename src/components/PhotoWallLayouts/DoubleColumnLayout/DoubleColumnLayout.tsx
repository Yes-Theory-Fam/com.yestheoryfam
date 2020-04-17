import * as React from "react";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import { splitImages } from "../../../utils";

const DoubleColumnLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal, , otherImages] = splitImages(images, 2, 0);

  return (
    <div className="row layout-row">
      <div className="column w-50">
        <PhotoWrapper className="h-66" src={otherImages[0].src} />
        <PhotoWrapper className="h-33" src={selectedHorizontal[0].src} />
      </div>
      <div className="column w-50">
        <PhotoWrapper className="h-33" src={selectedHorizontal[1].src} />
        <PhotoWrapper className="h-66" src={otherImages[1].src} />
      </div>
    </div>
  );
};

export default DoubleColumnLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4,
};
