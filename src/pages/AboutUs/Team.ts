import { JSXElementConstructor } from "react";
import { IconBaseProps } from "react-icons";
import { AiFillBehanceSquare } from "react-icons/ai";
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
import { FaArtstation } from "react-icons/fa";

import { Jamie, Michel, Haakon, Dima, Shagun, Travis, Matej, Carola, Sara, Lea, YesBot } from './teamImages';

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
  artstation?: string;
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
  "artstation": {
    name: "ArtStation",
    Icon: FaArtstation,
  }
};

export const team: Array<TeamMember> = [
  {
    name: "Jamie L.",
    portfolioPic: Jamie,
    quote: "This whole thing is starting to scare me.",
    title: "Project Manager",
    socials: {
      ig: 'https://instagram.com/jamie_legg_/',
      linkedin: 'https://linkedin.com/in/omnisjamie/',
      github: 'https://github.com/jamie-legg'
    },
  },
  {
    name: "Michel v.V.",
    portfolioPic: Michel,
    quote: "It should hopefully be fixed now.",
    title: "Frontend Developer",
    socials: {
      github: "https://github.com/geisterfurz007",
      linkedin: "https://linkedin.com/in/michelvonv",
    },
  },
  {
    name: "Håkon S.",
    portfolioPic: Haakon,
    quote: "I'm not getting any smarter.",
    title: "Full Stack Developer",
    socials: {
      github: "https://github.com/sklirg",
      linkedin: "https://no.linkedin.com/in/hlsolbjorg",
    },
  },
  {
    name: "Dmitri P.",
    portfolioPic: Dima,
    quote: "So how does this all work?",
    title: "Full Stack Developer",
    socials: {
      ig: "https://instagram.com/dimapanfilove/",
      github: "https://github.com/dimapanf",
      linkedin: "https://linkedin.com/in/dimapanfilov/",
    },
  },
  {
    name: "Shagun M.",
    portfolioPic: Shagun,
    quote: "My mind is going a mile an hour.",
    title: "Full Stack Developer",
    socials: {
      ig: "https://instagram.com/shagun_mistry/",
      github: "https://github.com/shagunmistry",
      linkedin: "https://linkedin.com/in/shagun-mistry/",
    },
  },
  {
    name: "Travis T.",
    portfolioPic: Travis,
    quote: "BIG TODO",
    title: "Intern",
    socials: {
      ig: "https://instagram.com/lenerdee",
      github: "http://github.com/travisthebot",
      linkedin: "https://linkedin.com/in/findtravishere",
    },
  },
  {
    name: "Matej P.",
    portfolioPic: Matej,
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
    portfolioPic: Carola,
    quote: "I don’t know how I got dragged into this.",
    title: "Graphic Designer/Illustrator",
    socials: {
      ig: "https://instagram.com/cludix.jpg/",
      linkedin: "https://linkedin.com/in/cludix",
      behance: "https://behance.net/cludix",
      artstation: "https://artstation.com/cludix"
    },
  },
  {
    name: "Sara O.",
    portfolioPic: Sara,
    quote: "Let’s f***ing do this sh*t!",
    title: "Graphic Designer",
    socials: {
      behance: 'https://behance.net/sa-o',
      ig: "https://instagram.com/sara.olmzdh/",
      linkedin: "https://linkedin.com/in/sa-o/",
    },
  },
  {
    name: "Lea K.",
    portfolioPic: Lea,
    quote: "‘tis broken.",
    title: "Copywriter",
    socials: {
      ig: "https://instagram.com/leakayy/",
      linkedin: "https://linkedin.com/in/lea-kay",
    },
  },
  {
    name: "Yes Bot",
    portfolioPic: YesBot,
    quote: "Beep Boop",
    title: "Mascot / Helper",
    socials: {},
  },
];
