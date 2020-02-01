import * as React from 'react';
import '../Redirect.scss';
import { Link } from 'react-router-dom';
import { randomString } from '../../utils';

const DiscordAuth = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;
    const scope = encodeURIComponent(process.env.REACT_APP_DISCORD_SCOPE ?? "");
    const redirectUri = encodeURIComponent(process.env.REACT_APP_DISCORD_REDIRECT_URI ?? "");

    const randomState = randomString() + randomString();

    const constructedLink = `https://discordapp.com/oauth2/authorize?response_type=token&client_id=${clientId}&state=${randomState}&scope=${scope}&redirect_uri=${redirectUri}`;

    localStorage.setItem("auth_state", randomState);

    window.location.href = constructedLink;

    return (
        <div className="discordAuth">
            <p>You should have been redirected by now.</p>
            <p>Click <Link to={constructedLink}>here</Link> to authenticate with Discord!</p>
        </div>
    );
}

export default DiscordAuth;
