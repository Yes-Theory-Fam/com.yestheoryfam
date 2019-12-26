import * as React from 'react';
import './DiscordAuthenticationRequest.scss';
import { Link } from 'react-router-dom';

const DiscordAuth = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;
    const scope = encodeURIComponent(process.env.REACT_APP_DISCORD_SCOPE ?? "");
    const redirectUri = encodeURIComponent(process.env.REACT_APP_DISCORD_REDIRECT_URI ?? "");

    const randomString = () => Math.random().toString(36).substring(2, 15);
    const randomState = randomString() + randomString();

    const constructedLink = `https://discordapp.com/oauth2/authorize?response_type=token&client_id=${clientId}&state=${randomState}&scope=${scope}&redirect_uri=${redirectUri}`;

    document.cookie = "auth_state=" + randomState + ";path=/";

    window.location.href = constructedLink;

    return (
        <div className="discordAuth">
            <p>You should have been redirected by now.</p>
            <p>Click <Link to={constructedLink}>here</Link> to authenticate with Discord!</p>
        </div>
    );
}

export default DiscordAuth;
