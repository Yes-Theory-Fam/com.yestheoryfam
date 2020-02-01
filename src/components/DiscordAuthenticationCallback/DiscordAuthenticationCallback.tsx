import * as React from 'react';
import '../Redirect.scss';
import { Link, useHistory, Redirect } from 'react-router-dom';

const DiscordAuthenticationCallback = () => {
    const storedState = localStorage.getItem("auth_state");
    const sentState = new URLSearchParams(window.location.hash).get("state");

    localStorage.removeItem("auth_state");

    const history = useHistory();
    history.push("/");

    if (storedState !== sentState) {
        console.error("Stored state did not equal the one sent by discord. User won't be authenticated!");
        return <RedirectNotice />
    }

    // Use the token to do auth here.

    return <RedirectNotice />;
};

const RedirectNotice = () => {
    return <div className="discordAuth">
        <p>You should have been redirected to the main page already!</p>
        <p>Click <Link to="/">here</Link> to get there.</p>
    </div>
}

export default DiscordAuthenticationCallback;
