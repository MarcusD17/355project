'use client';

import React, { useEffect, useRef, useState } from 'react';
import SearchForm from "@/app/ui/search-form";
import Footer from "@/app/ui/footer";

export default function Home() {
    // State to manage the index of the text being displayed
    const [idx, setIdx] = useState(1);
    const textRef = useRef<HTMLHeadingElement | null>(null);
    const text = 'Find Your Next Recipe'; // Updated text
    const speed = 50; // Slowed down speed in ms

    useEffect(() => {
        const writeText = () => {
            if (textRef.current) {
                textRef.current.innerText = text.slice(0, idx); // Update displayed text
            }

            // Move to the next index or stop if at the end
            if (idx < text.length) {
                setIdx(prevIdx => prevIdx + 1);
            }
        };

        const timer = setInterval(writeText, speed); // Use setInterval for consistent timing

        // Clean up interval on unmount
        return () => clearInterval(timer);
    }, [idx, speed]); // Depend on idx and speed

    return (
        <div className="min-h-screen">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover scale-[1.3] -z-10 object-center"
            >
                <source src="/videos/cooking-background.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>

            {/* Dark overlay */}
            <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

            {/* Main Content Container */}
            <div>
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        {/* Updated text displayed in auto text effect */}
                        <h2 ref={textRef} className="text-4xl font-semibold mb-4 text-white">‎</h2>
                        <SearchForm />
                    </div>
                </section>

                {/* Footer - Separate z-index to ensure it's always on top */}
                <Footer />
            </div>
        </div>
    );
}
