import * as React from 'react';
import { Link } from 'react-router-dom';

const DiscordAuthenticationCallback = () => {
    // https://stackoverflow.com/a/43682482/6707985
    const toEntries = (arr: Array<Array<string>>) => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));
    const cookies = toEntries(document.cookie.split("; ").map(c => c.split("=")));
    const storedState = cookies["auth_state"];
    const sentState = new URLSearchParams(window.location.hash).get("state");

    if (storedState !== sentState) {
        alert("That's bad. Shouldn't have happened. Should also have a better error message than just an alert, really.");
    }

    document.cookie = "auth_state=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    window.location.href = "/";

    return (
        <div className="discordAuth">
            <p>You should have been redirected to the main page already!</p>
            <p>Click <Link to="/">here</Link> to get there.</p>
        </div>
    );
};

export default DiscordAuthenticationCallback;
