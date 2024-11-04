'use client';

import React, { useEffect, useState } from 'react';
import keycodeStyles from '../ui/easter-egg/keycode.module.css'; // Importing keycode styles
import dadJokesStyles from '../ui/easter-egg/dad-jokes.module.css';
import kineticStyle from '../ui/easter-egg/kinetic-loader-udemy.module.css'; // Adjust path if needed
import Footer from "@/app/ui/footer"; // Importing footer styles

// Define the type for key information
interface KeyInfo {
    key: string;
    keyCode: number;
    code: string;
}

export default function EasterEgg() {
    const [keyInfo, setKeyInfo] = useState<KeyInfo>({ key: '\u00A0', keyCode: 0, code: '\u00A0' }); // Initialize with non-breaking spaces

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeyInfo({
                key: e.key === ' ' ? 'Space' : e.key,
                keyCode: e.keyCode,
                code: e.code,
            });
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const jokeEl = document.getElementById('joke') as HTMLElement; // Type assertion for joke element
        const jokeBtn = document.getElementById('joke-btn') as HTMLElement; // Type assertion for button

        // Check if the button exists before adding an event listener
        if (jokeBtn) {
            jokeBtn.addEventListener('click', generateJoke);
        }

        generateJoke(); // Fetch a joke on component mount

        async function generateJoke() {
            const config = {
                headers: {
                    Accept: 'application/json',
                },
            };

            const res = await fetch('https://icanhazdadjoke.com/', config);
            const data = await res.json();
            jokeEl.innerHTML = data.joke; // Update joke content
        }
    }, []);

    return (

        <div className={`min-h-screen flex items-center justify-center text-center `}>
            <div id="insert">
                <div className={keycodeStyles.key}>
                    {keyInfo.key || '\u00A0'} {/* Display non-breaking space */}
                    <small>event.key</small>
                </div>
                <div className={keycodeStyles.key}>
                    {keyInfo.keyCode || '\u00A0'} {/* Default to 0 */}
                    <small>event.keyCode</small>
                </div>
                <div className={keycodeStyles.key}>
                    {keyInfo.code || '\u00A0'} {/* Display non-breaking space */}
                    <small>event.code</small>
                </div>
                {/* Add margin for spacing */}
                <div className={`${dadJokesStyles.container} mt-8`}>
                    <p id="joke" className={dadJokesStyles.jokeText}>Loading joke...</p>
                    <button id="joke-btn" className={`${dadJokesStyles.jokeButton} mt-4`}>Get Another Joke</button>
                </div>
            </div>
            <div className={kineticStyle.kinetic}>
            </div>
                <Footer/>

        </div>
    );
}
