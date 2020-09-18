import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";

import styles from "./OneFourLayout.module.scss";
import classNames from "classnames";

const OneFourLayout: React.FC<LayoutProps> = ({ images }) => {
  const sources = images.map(({ src }) => src);

  return (
    <div className={classNames(styles.ofLayout, "photowall-layout-row")}>
      <PhotoWrapper className={styles.big} src={sources[0]} />
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
