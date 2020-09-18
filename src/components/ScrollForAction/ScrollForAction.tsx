import classNames from "classnames";
import styles from "./ScrollForAction.module.scss";
import navBarStyles from "../NavBar/NavBar.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import * as React from "react";

interface ScrollForActionProps {
  containerClassNames?: string;
  callText: string;
  scrollToRef?: React.RefObject<HTMLElement | undefined>;
}

const ScrollForAction: React.FC<ScrollForActionProps> = ({ callText, scrollToRef, containerClassNames }) => {
  const scrollToAction = () => {
    if (!scrollToRef) return;

    const yOffset = -(document.querySelector(navBarStyles.navBar)?.getBoundingClientRect()?.height ?? 100);
    const y = (scrollToRef.current?.getBoundingClientRect()?.top ?? 0) + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      className={classNames(
        styles.scrollForMore,
        "column-center",
        { [styles.pointer]: scrollToRef },
        containerClassNames
      )}
      onClick={scrollToAction}
    >
      {callText}
      <div className={styles.expandContainer}>
        <IoIosArrowDown size={20} />
      </div>
    </div>
  );
};

export default ScrollForAction;
