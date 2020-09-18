import * as React from "react";

import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import styles from "./VerticalLeftLayout.module.scss";
import classNames from "classnames";

const VerticalLeftLayout: React.FC<LayoutProps> = ({ images }) => {
  const [[chosenHorizontal], [chosenVertical], otherImages] = splitImages(images, 1, 1);

  return (
    <div className={classNames(styles.vlLayout, "layout-row")}>
      <PhotoWrapper className={styles.tall} src={chosenVertical.src} />
      <PhotoWrapper className={styles.long} src={chosenHorizontal.src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
    </div>
  );
};

export default VerticalLeftLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 1,
  verticalImages: 1,
  totalImages: 4,
};
