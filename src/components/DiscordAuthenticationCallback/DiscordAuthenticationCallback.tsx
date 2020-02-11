import * as React from 'react';
import { useHistory } from 'react-router-dom';
import RedirectNotice from '../RedirectNotice/RedirectNotice';

const DiscordAuthenticationCallback = () => {
    const storedState = localStorage.getItem("auth_state");
    const sentState = new URLSearchParams(window.location.hash).get("state");

    localStorage.removeItem("auth_state");

    const history = useHistory();
    history.push("/");

    if (storedState !== sentState) {
        console.error("Stored state did not equal the one sent by discord. User won't be authenticated!");
        return <RedirectNotice url="/"/>
    }

    // Use the token to do auth here.

    return <RedirectNotice url="/"/>;
};

export default DiscordAuthenticationCallback;
