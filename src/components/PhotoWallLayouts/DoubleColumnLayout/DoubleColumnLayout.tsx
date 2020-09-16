import * as React from "react";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import { splitImages } from "../../../utils";

import styles from "./DoubleColumnLayout.module.scss";
import classNames from "classnames";

const DoubleColumnLayout: React.FC<LayoutProps> = ({ images }) => {
  const [selectedHorizontal, , otherImages] = splitImages(images, 2, 0);

  return (
    <div className={classNames(styles.dcLayout, "layout-row")}>
      <PhotoWrapper className={styles.tall1} src={otherImages[0].src} />
      <PhotoWrapper src={selectedHorizontal[0].src} />
      <PhotoWrapper src={selectedHorizontal[1].src} />
      <PhotoWrapper className={styles.tall2} src={otherImages[1].src} />
    </div>
  );
};

export default DoubleColumnLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 2,
  verticalImages: 0,
  totalImages: 4,
};
