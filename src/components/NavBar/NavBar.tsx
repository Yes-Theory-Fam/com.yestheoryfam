import * as React from 'react';
import './NavBar.scss';

const Logo: React.FC = () => {
    return <a href="/" id="nav-bar-logo">YESTHEORY<b>FAM</b></a>
}

const Link: React.FC<{href: string, text: string}> = ({href, text}: {href: string, text: string}) => {
    return <a href={href}>{text}</a>
}

const DiscordLoginButton: React.FC = () => {
    return <a className="discord-login" href="/auth/discord">DISCORD LOGIN</a>;
}

const CircularAvatar: React.FC = () => {
    return <img
        src="https://mirrors.creativecommons.org/presskit/icons/nc-jp.png" //Just some random thing that worked
        height="48"
        width="48"
        style={{borderRadius: 50}}
    />
}

const NavBar: React.FC = () => {
    return <div id="nav-bar">
        <Logo />
        <div id="nav-links">
            <Link href="/" text="HOME"/>
            <Link href="/" text="BLOG"/>
            <Link href="/" text="MEETUPS"/>
            <Link href="/" text="PHOTOWALL"/>
            <Link href="/" text="GROUPCHATS"/>
            <Link href="/" text="ABOUT"/>
            <Link href="/" text="CONTACT"/>
            <CircularAvatar />
        </div>
    </div>
};

export default NavBar;
