import { FC, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";

// Helper component scrolling up the page after route change
// https://stackoverflow.com/a/54343182/6707985
const ScrollToTop: FC<RouteComponentProps> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => window.scrollTo(0, 0));
    return () => unlisten();
  });

  return null;
};

export default withRouter(ScrollToTop);
