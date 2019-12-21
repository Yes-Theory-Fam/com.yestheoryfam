import * as React from "react";
import { useState, useEffect } from "react";

import "./ComingSoon.scss"

// This is how real men code: stealing code from the internet
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const loadingMessages = [
    "Looking for some awesome meetups",
    "Joining Facebook group",
    "Subscribing to YouTube channel",
    "Posting a discomforting story to facebook group",
    "Rewatching old videos",
    "Travelling the world",
    "Waiting for some developers to code more on this website",
    "Waiting for some designers to design more for this website",
    "Planning a new trip",
    "Starting all over again",
    "Seeking discomfort",
    "Saying yes to waiting a bit longer for more website content",
    "Making up some excuse for why this doesn't finish loading",
]

let loadingMessageInterval: number = -1;

const ComingSoon = () => {
    const [loadingMessage, setLoadingMessage] = useState('Loading website content')

    useEffect(() => {
        loadingMessageInterval = window.setInterval(() => {
            setLoadingMessage(loadingMessages[getRandomInt(0, loadingMessages.length)])
        }, 4000)

        // Cleanup of effect
        return () => clearInterval(loadingMessageInterval);
    })

    return (
        <div className="comingSoon">
            <header>
                <h1>Coming Soon!</h1>
            </header>
            <section>
                <div>
                    <p>Yes Theory Fam Community Website</p>
                </div>
                <div className="comingSoon--progress">
                    <div className="comingSoon--progress--container">
                        <span className="comingSoon--progress--bar" />
                    </div>
                    <p>{loadingMessage}</p>
                    <p className="comingSoon--text">
                        This website is still under construction. Check back later.
                    </p>
                </div>
                <div className="comingSoon--cool"></div>
            </section>
        </div>
    )
}

export default ComingSoon;
