import * as React from "react";
import "./Aboutus.scss";
import NavBar from "../../components/NavBar/NavBar";
import { IoLogoInstagram, IoLogoLinkedin, IoLogoGithub, IoLogoTwitch, IoLogoTwitter } from "react-icons/io";
import Footer from "../../components/Footer/Footer";
import { team } from './Team';

interface socialsInterface {
    ig: string,
    github: string,
    linkedin: string,
    twitter: string,
}
const SocialMediaInfo: React.FC<{}> = () => {
    // React.FC<{ socials: socialsInterface }>
    //     = ({ socials }) => {
    let socialArr = [];
    const socials = { ig: 'test-ig', twitter: 'test-twitter', github: 'test-github', linkedin: 'test-linkedin' };
    if (socials.ig) {
        socialArr.push(
            <li><a className="sociali" href={socials.ig} target="_blank" aria-label="Instagram">
                <IoLogoInstagram />
            </a></li>
        );
    }
    if (socials.github) {
        socialArr.push(
            <li><a className="sociali" href={socials.github} target="_blank" aria-label="Github">
                <IoLogoGithub />
            </a></li>
        );
    }
    if (socials.linkedin) {
        socialArr.push(
            <li><a className="sociali" href={socials.ig} target="_blank" aria-label="Linkedin">
                <IoLogoLinkedin />
            </a></li>
        );
    }
    if (socials.twitter) {
        socialArr.push(
            <li><a className="sociali" href={socials.twitter} target="_blank" aria-label="Twitter">
                <IoLogoTwitter />
            </a></li>
        );
    }

    return (
        <div className="social-icons">
            <ul className="social-icons-set">
                {socialArr}
            </ul>
        </div>
    )
};

const AboutUs: React.FC = () => {
    return (
        <>
            <NavBar fixed={true} />
            <div className='about-us'>
                <div className="about-us-header">
                    Meet the
                    <div className="inline-blue">team</div>
                </div>
                <div className='about-us-introduction'>
                    Wondering who’s working behind the scenes? Well, meet the team. We’re nine people from 3 different continents, aged 19 to 26. Although we’re thousands of miles away from each other, we all have common interests. We met each other through the Yes Theory Fam Discord Server, and we want to help others connect and find like-minded people, the same way we found each other. That’s why we’re doing this, to allow you to turn strangers into lifelong friends! Feel free to contact each of us and give us a follow.
                </div>
                <hr />
                <div className='row team-pics'>
                    {
                        team.map((eachPerson) => {
                            return (<div className='column team-individual'>
                                <img
                                    className='team-individual-avatar'
                                    src={eachPerson.portfolioPic}
                                    alt={eachPerson.name}
                                />
                                <div className='team-individual-info'>
                                    <p className='blue'>{eachPerson.name}</p>
                                    <strong>{eachPerson.title}</strong>
                                    <p>"{eachPerson.quote}"</p>
                                </div>
                                <SocialMediaInfo
                                // socials={eachPerson.socials} 
                                />
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;