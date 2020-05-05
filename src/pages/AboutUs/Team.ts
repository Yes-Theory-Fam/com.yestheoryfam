import { JSXElementConstructor } from "react";
import { IconBaseProps } from "react-icons";
import { AiFillBehanceSquare } from "react-icons/ai";
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
export interface TeamMember {
  name: string;
  portfolioPic: string;
  quote: string;
  title: string;
  socials: Socials;
}

export interface Socials {
  behance?: string;
  github?: string;
  ig?: string;
  linkedin?: string;
  twitter?: string;
}

type Available = keyof Socials;

export interface Platform {
  name: string;
  Icon: JSXElementConstructor<IconBaseProps>,
}

export const platforms: { [key in Available]: Platform } = {
  "behance": {
    name: "Behance",
    Icon: AiFillBehanceSquare,
  },
  "github": {
    name: "GitHub",
    Icon: IoLogoGithub,
  },
  "ig": {
    name: "Instagram",
    Icon: IoLogoInstagram,
  },
  "linkedin": {
    name: "LinkedIn",
    Icon: IoLogoLinkedin,
  },
  "twitter": {
    name: "Twitter",
    Icon: IoLogoTwitter,
  },
};

export const team: Array<TeamMember> = [
  {
    name: "Jamie L.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "This whole thing is starting to scare me.",
    title: "Project Manager",
    socials: {
      ig: 'https://www.instagram.com/jamie_legg_/',
      linkedin: 'https://www.linkedin.com/in/omnisjamie/',
      github: 'https://github.com/jamie-legg'
    },
  },
  {
    name: "Michel v.V.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "It should hopefully be fixed now.",
    title: "Frontend Developer",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
      twitter: "twitter",
      linkedin: "linkedin",
    },
  },
  {
    name: "Håkon S.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "I'm not getting any smarter.",
    title: "Full Stack Developer",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
      twitter: "twitter",
      linkedin: "linkedin",
    },
  },
  {
    name: "Dmitri P.",
    portfolioPic:
      "https://media-exp1.licdn.com/dms/image/C5603AQEFw1EPLcqFCQ/profile-displayphoto-shrink_200_200/0?e=1593043200&v=beta&t=gMafpnXPzEF2IhGqO938XUNvjKyen6lhXiqvD-jggEk",
    quote: "So how does this all work?",
    title: "Full Stack Developer",
    socials: {
      ig: "https://www.instagram.com/dimapanfilove/",
      github: "https://github.com/dimapanf",
      linkedin: "https://www.linkedin.com/in/dimapanfilov/",
    },
  },
  {
    name: "Shagun M.",
    portfolioPic:
      "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p480x480/73346489_10216496194497398_6160492027554299904_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=VeRaHY67670AX_9BtK_&_nc_ht=scontent-atl3-1.xx&_nc_tp=6&oh=6dca729dd125f2be49f4a20d1c43c762&oe=5EC5A991",
    quote: "My mind is going a mile an hour.",
    title: "Full Stack Developer",
    socials: {
      ig: "https://www.instagram.com/shagun_mistry/",
      github: "https://github.com/shagunmistry",
      linkedin: "https://www.linkedin.com/in/shagun-mistry/",
    },
  },
  {
    name: "Travis T.",
    portfolioPic:
      "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p480x480/73346489_10216496194497398_6160492027554299904_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=VeRaHY67670AX_9BtK_&_nc_ht=scontent-atl3-1.xx&_nc_tp=6&oh=6dca729dd125f2be49f4a20d1c43c762&oe=5EC5A991",
    quote: "BIG TODO",
    title: "Intern",
    socials: {
      ig: "https://www.instagram.com/shagun_mistry/",
      github: "https://github.com/shagunmistry",
      linkedin: "https://www.linkedin.com/in/shagun-mistry/",
    },
  },
  {
    name: "Matej P.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "Michel move that 2 pixels to the right.",
    title: "UI/UX Designer",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
      twitter: "twitter",
    },
  },
  {
    name: "Carola L.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "I don’t know how I got dragged into this.",
    title: "Graphic Designer/Illustrator",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
      twitter: "twitter",
      linkedin: "linkedin",
    },
  },
  {
    name: "Sara O.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "Let’s f***ing do this sht!",
    title: "Graphic Designer",
    socials: {
      behance: 'https://www.behance.net/sa-o',
      ig: "https://www.instagram.com/sara.olmzdh/",
      linkedin: "https://www.linkedin.com/in/sa-o/",
    },
  },
  {
    name: "Lea K.",
    portfolioPic:
      "https://avatars2.githubusercontent.com/u/33829929?s=460&u=9b320dc99638f062827291de857ea7a82cbc4b1a&v=4",
    quote: "‘tis broken.",
    title: "Copywriter",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
      twitter: "twitter",
      linkedin: "linkedin",
    },
  },
  {
    name: "Yes Bot",
    portfolioPic:
      "https://yestheoryfam.com/e2eed95002185eb117ba94a0b85d53d2.png",
    quote: "Beep Boop",
    title: "Mascot / Helper",
    socials: {
      ig: "https://ig-link.com",
      github: "github",
    },
  },
];
