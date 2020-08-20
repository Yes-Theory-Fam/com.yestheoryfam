import Aboutus from "./AboutUs/Aboutus";
import BlogOverview from "./BlogOverview/BlogOverview";
import BuddyProject from "./BuddyProject/BuddyProject";
import Groupchats from "./groupchats/Groupchats";
import Home from "./home/Home";
import MeetupDetails from "./MeetupDetails/MeetupDetails";
import Meetups from "./meetups/Meetups";
import PhotoWall from "./photowall/PhotoWall";
import WorkInProgress from "./WorkInProgress/WorkInProgress";
import Playground from "./Playground/QuillTesting";
import Blog, { BlogRouteProps } from "./Blog/Blog";

import React, { JSXElementConstructor, ReactNode } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { StaticContext } from "react-router";

interface NavPage {
  isNew: boolean;
  path: string;
  display: string;
  component: {
    render?: (props: RouteComponentProps<any, StaticContext, any>) => ReactNode;
    component?: JSXElementConstructor<{}>;
  };
  available: boolean;
}

const MeetupRouting = ({ match: { url } }: { match: { url: string } }) => (
  <>
    <Route path={`${url}/:id`} component={MeetupDetails} />
    <Route path={`${url}/`} exact>
      <Meetups />
    </Route>
  </>
);

const BlogRouting = ({ match: { url } }: { match: { url: string } }) => (
  <>
    <Route
      path={`${url}/preview/:id`}
      exact
      render={(props: BlogRouteProps) => <Blog {...props} preview />}
    />
    <Switch>
      <Route path={`${url}/write`} exact component={Playground} />
      <Route
        path={`${url}/:id`}
        exact
        render={(props: BlogRouteProps) => <Blog {...props} />}
      />
    </Switch>
    <Route path={`${url}/`} exact component={BlogOverview} />
  </>
);

const pages: Array<NavPage> = [
  {
    isNew: false,
    path: "home",
    display: "home",
    component: { component: Home },
    available: true,
  },
  {
    isNew: true,
    path: "buddyproject",
    display: "buddy project",
    component: { component: BuddyProject },
    available: true,
  },
  {
    isNew: true,
    path: "blogs",
    display: "blog",
    component: { render: BlogRouting },
    available: true,
  },
  {
    isNew: false,
    path: "meetups",
    display: "meetups",
    component: { render: MeetupRouting },
    available: true,
  },
  {
    isNew: false,
    path: "photowall",
    display: "photowall",
    component: { component: PhotoWall },
    available: true,
  },
  {
    isNew: false,
    path: "groupchats",
    display: "groupchats",
    component: { component: Groupchats },
    available: true,
  },
  {
    isNew: false,
    path: "about",
    display: "about",
    component: { component: Aboutus },
    available: true,
  },
];

export {
  Aboutus,
  BlogOverview,
  BuddyProject,
  Groupchats,
  Home,
  MeetupDetails,
  Meetups,
  PhotoWall,
  WorkInProgress,
  NavPage,
  pages,
};
