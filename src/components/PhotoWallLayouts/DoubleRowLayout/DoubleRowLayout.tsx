import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import styles from "./DoubleRowLayout.module.scss";
import classNames from "classnames";

const DoubleRowLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal, , otherImages] = splitImages(images, 2, 0);

  return (
    <div className={classNames(styles.drLayout, "layout-row")}>
      <PhotoWrapper className={styles.long1} src={selectedHorizontal[0].src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
      <PhotoWrapper className={styles.long2} src={selectedHorizontal[1].src} />
    </div>
  );
};

export default DoubleRowLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4,
};
