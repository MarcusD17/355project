'use client';

import {useEffect, useRef, useState} from 'react';
import styles from '../ui/about/incrementing-counter.module.css';
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function AboutPage() {
    const [activePanel, setActivePanel] = useState(0);

    const panels = [
        {
            title: "Our Mission",
            image: "/images/chef1.jpg",
            content: "Welcome to our recipe entry site! Our mission is to make it easy for food enthusiasts to share and discover delicious recipes."
        },
        {
            title: "Our Vision",
            image: "/images/recipeBook.jpg",
            content: "Creating a welcoming and user-friendly space for everyone who loves to cook and explore new dishes."
        },
        {
            title: "Our Team",
            image: "/images/chef2.png",
            content: "Meet our dedicated team of food enthusiasts and technology experts."
        },
        {
            title: "Our Community",
            image: "/images/chip.jpg",
            content: "Join our growing community of food lovers and recipe creators."
        },
        {
            title: "Our Future",
            image: "/images/chef3.png",
            content: "Building the future of recipe sharing and culinary exploration."
        }
    ];

    const twitterRef = useRef<HTMLDivElement>(null);
    const youtubeRef = useRef<HTMLDivElement>(null);
    const facebookRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const counters = [
            { ref: twitterRef, target: 1242 },
            { ref: youtubeRef, target: 51985 },
            { ref: facebookRef, target: 2237 }
        ];

        counters.forEach(({ ref, target }) => {
            // Check if ref is current and assigned before proceeding
            if (ref.current) {
                ref.current.innerText = '0';

                const increment = target / 200; // Adjust this value to control the speed
                let currentCount = 0;

                const updateCounter = () => {
                    if (currentCount < target) {
                        currentCount = Math.ceil(currentCount + increment);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        ref.current.innerText = `${currentCount}`;
                        requestAnimationFrame(updateCounter);
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        ref.current.innerText = target.toString();
                    }
                };

                updateCounter(); // Start the counter
            }
        });
    }, []);



    return (
        <div className="max-w-4xl mx-auto p-8 space-y-4 mt-8">
            <h1 className="text-3xl font-bold text-center pt-20 md:pb-2">About Us</h1>

            {/* Expanding Cards Container */}
            <div className="flex space-x-4 p-8 max-w-7xl mx-auto">
                {panels.map((panel, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden rounded-[50px] cursor-pointer
                            ${activePanel === index ? 'flex-[5] max-w-3xl' : 'flex-[0.5]'}
                            transition-all duration-700 ease-in-out h-[15vh]`}
                        onClick={() => setActivePanel(index)}
                        style={{
                            backgroundImage: `url(${panel.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30"/>
                        <h3
                            className={`absolute bottom-8 left-8 text-2xl text-white m-0
                                ${activePanel === index ? 'opacity-100 transition-opacity delay-[400ms]' : 'opacity-0'}
                                transition-opacity duration-300`}
                        >
                            {panel.title}
                        </h3>
                        {activePanel === index && (
                            <p className="absolute bottom-20 left-8 right-8 text-white opacity-90 transition-opacity duration-300">
                                {panel.content}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <section className="max-w-4xl mx-auto p-4 space-y-4 mt-8">
                <p className="text-lg leading-relaxed">
                    Welcome to our recipe entry site! Our mission is to make it easy for food enthusiasts to share and
                    discover delicious recipes. Whether you are a home cook or a professional chef, our platform is
                    designed to help you find inspiration, save your favorite recipes, and contribute to a growing
                    collection of culinary ideas.
                </p>
                <p className="text-lg leading-relaxed">
                    Here, you can enter your recipes and get back comprehensive results that include preparation
                    details, cooking time, and nutritional information. Our goal is to create a welcoming and
                    user-friendly space for everyone who loves to cook and explore new dishes.
                </p>
            </section>

            <section className={styles.bodyCounterContainer}>
                <div className={styles.counterContainer}>
                    <FaTwitter style={{ fontSize: '3rem' }} />
                    <div ref={twitterRef} className={styles.counter}>0</div>
                    <span>Twitter Followers</span>
                </div>
                <div className={styles.counterContainer}>
                    <FaYoutube style={{ fontSize: '3rem' }} />
                    <div ref={youtubeRef} className={styles.counter}>0</div>
                    <span>Youtube Subscribers</span>
                </div>
                <div className={styles.counterContainer}>
                    <FaInstagram style={{ fontSize: '3rem' }} />
                    <div ref={facebookRef} className={styles.counter}>0</div>
                    <span>Facebook Fans</span>
                </div>
            </section>


            <section className="max-w-4xl mx-auto p-4 space-y-4 mt-8">
                <h2 className="text-2xl font-semibold text-center md:p-4">Why We Started</h2>
                <p className="text-lg leading-relaxed">
                    We believe that cooking should be accessible, enjoyable, and communal. Our platform was born from a
                    desire to bring together people from all backgrounds and skill levels to share recipes and cooking
                    tips. With each recipe entry, you’re contributing to a larger community of food lovers!
                </p>
            </section>
            {/* Team Section */}
            <section className="max-w-4xl mx-auto p-8 space-y-4 mt-8 pb-24 mb-16">
                <h2 className="text-2xl font-semibold text-center">Meet the Team</h2>
                <ul className="space-y-2 text-center">
                    <li><strong>Jahid Hasan</strong> - Founder & Chef Extraordinaire</li>
                    <li><strong>Marcus Dawodu</strong> - Lead Developer & Recipe Enthusiast</li>
                    <li><strong>Michael Pan</strong> - UX Designer & Food Aficionado</li>
                </ul>
            </section>

            <footer
                className="bg-blue-500/90 backdrop-blur-sm p-4 text-center text-white fixed left-0 bottom-0 w-full z-50">
                <p>&copy; 2024 My Website. Jahid Hasan, Marcus Dawodu, Michael Pan. All rights reserved.</p>
            </footer>
        </div>
    );
}