import * as React from "react";
import { PhotoWallLayoutProps, LayoutProps } from "../PhotoWallLayoutTypes";
import PhotoWrapper from "../PhotoWrapper/PhotoWrapper";
import { splitImages } from "../../../utils";

import styles from "./DoubleVerticalLayout.module.scss";
import classNames from "classnames";

const DoubleVerticalLayout: React.FC<LayoutProps> = ({ images }) => {
  const [, chosenVerticals, otherImages] = splitImages(images, 0, 2);

  return (
    <div className={classNames(styles.dvLayout, "layout-row")}>
      <PhotoWrapper className={styles.tall} src={chosenVerticals[0].src} />
      <PhotoWrapper src={otherImages[0].src} />
      <PhotoWrapper src={otherImages[1].src} />
      <PhotoWrapper className={styles.tallRight} src={chosenVerticals[1].src} />
    </div>
  );
};

export default DoubleVerticalLayout;

export const props: PhotoWallLayoutProps = {
  horizontalImages: 0,
  totalImages: 4,
  verticalImages: 2,
};
