interface NavPage {
  isNew: boolean;
  path: string;
  display: string;
}

const pages: Array<NavPage> = [
  {
    isNew: false,
    path: "home",
    display: "home",
  },
  {
    isNew: true,
    path: "buddyproject",
    display: "buddy project",
  },
  {
    isNew: false,
    path: "blog",
    display: "blog",
  },
  {
    isNew: false,
    path: "meetups",
    display: "meetups",
  },
  {
    isNew: false,
    path: "photowall",
    display: "photowall",
  },
  {
    isNew: false,
    path: "groupchats",
    display: "groupchats",
  },
  {
    isNew: false,
    path: "about",
    display: "about",
  },
  {
    isNew: false,
    path: "contact",
    display: "contact",
  },
];

export default pages;
export { NavPage };
