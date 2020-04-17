import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";

const OneFourLayout: React.FC<LayoutProps> = ({ images }) => {
  const sources = images.map(({ src }) => src);

  return (
    <div className="row layout-row">
      <PhotoWrapper className="w-50" src={sources[0]} />
      <div className="column w-50">
        <div className="row h-50">
          <PhotoWrapper className="w-50" src={sources[1]} />
          <PhotoWrapper className="w-50" src={sources[2]} />
        </div>
        <div className="row h-50">
          <PhotoWrapper className="w-50" src={sources[3]} />
          <PhotoWrapper className="w-50" src={sources[4]} />
        </div>
      </div>
    </div>
  );
};

export default OneFourLayout;
export const props: PhotoWallLayoutProps = {
  totalImages: 5,
  horizontalImages: 0,
  verticalImages: 0,
};
