import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

const DiscordAuthenticationCallback = () => {
    // https://stackoverflow.com/a/43682482/6707985
    const toEntries = (arr: Array<Array<string>>) => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));
    
    const storedState = localStorage.getItem("auth_state");
    const sentState = new URLSearchParams(window.location.hash).get("state");

    if (storedState !== sentState) {
        alert("That's bad. Shouldn't have happened. Should also have a better error message than just an alert, really.");
    }

    localStorage.removeItem("auth_state");

    const history = useHistory();
    history.push("/");

    return (
        <div className="discordAuth">
            <p>You should have been redirected to the main page already!</p>
            <p>Click <Link to="/">here</Link> to get there.</p>
        </div>
    );
};

export default DiscordAuthenticationCallback;
