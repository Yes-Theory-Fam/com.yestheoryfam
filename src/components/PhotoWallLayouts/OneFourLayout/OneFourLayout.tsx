import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";

import "./OneFourLayout.scss";

const OneFourLayout: React.FC<LayoutProps> = ({ images }) => {
  const sources = images.map(({ src }) => src);

  return (
    <div className="of-layout layout-row">
      <PhotoWrapper className="big" src={sources[0]} />
      <PhotoWrapper src={sources[1]} />
      <PhotoWrapper src={sources[2]} />
      <PhotoWrapper src={sources[3]} />
      <PhotoWrapper src={sources[4]} />
    </div>
  );
};

export default OneFourLayout;
export const props: PhotoWallLayoutProps = {
  totalImages: 5,
  horizontalImages: 0,
  verticalImages: 0,
};
