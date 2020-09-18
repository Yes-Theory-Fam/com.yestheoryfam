import { FC, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

const savePage = (currentPage: string) => {
  if (!currentPage.includes("auth")) localStorage.setItem("current_page", currentPage);
};

// Saves the current path in localstorage when the page is loaded or changed
// Excluding auth routes
const SavePage: FC<RouteComponentProps> = ({ history, location }) => {
  savePage(location.pathname);

  useEffect(() => {
    const unlisten = history.listen((newLocation) => savePage(newLocation.pathname));
    return () => unlisten();
  });

  return null;
};

export default withRouter(SavePage);
