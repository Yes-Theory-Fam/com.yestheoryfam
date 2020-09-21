import * as React from "react";
import styles from "./CommonLayout.module.scss";
import classNames from "classnames";
import ScrollForAction from "../ScrollForAction/ScrollForAction";

interface CommonLayoutProps {
  TopComponent: React.FC;
  BottomComponent: React.FC;
  scrollForActionText: string;
  scrollForActionClassName?: string;
  topMargin?: boolean;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({
  TopComponent,
  BottomComponent,
  scrollForActionText,
  scrollForActionClassName,
  topMargin = true,
}) => {
  const bottomRef = React.useRef(null);

  return (
    <>
      <div className={classNames({ [styles.topContainer]: topMargin }, "column-center")}>
        <div className={classNames(styles.topComponentContainer, "centered-content")}>
          <TopComponent />
        </div>
        <ScrollForAction
          callText={scrollForActionText}
          scrollToRef={bottomRef}
          containerClassNames={scrollForActionClassName}
        />
      </div>
      <div ref={bottomRef} className="column-center">
        <BottomComponent />
      </div>
    </>
  );
};

export default CommonLayout;
