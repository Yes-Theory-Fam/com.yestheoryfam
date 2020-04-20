import { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const savePage = (currentPage: string) => {
  localStorage.setItem("current_page", currentPage);
}

// Ok hear me out...
// history listen fires when the route is changing but with the old location
// Which is exactly what we want because the redirect moves over one step on the route
// /auth/discord
// So the page before that route is the one the user was active one when clicking the button
// so the one that we want to go back to which is why this work
const SavePage: FC<RouteComponentProps> = ({ history, location }) => {
  useEffect(() => {
    const unlisten = history.listen(() => savePage(location.pathname));
    return () => unlisten();
  });

  return null;
};

export default withRouter(SavePage);
