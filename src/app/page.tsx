import SearchForm from "@/app/ui/search-form";

export default function Home() {
    return (
        <div className=" min-h-screen">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover scale-[1.3] -z-10 object-center"
            >
                <source
                    src="/videos/cooking-background.webm"
                    type="video/webm"
                />
                Your browser does not support the video tag.
            </video>

            {/* Dark overlay */}
            <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

            {/* Main Content Container */}
            <div>
                {/* Hero Section */}
                <section className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold mb-4 text-white">
                            Find Your Next Recipe
                        </h2>
                        <SearchForm/>
                    </div>
                </section>

                {/* Footer - Separate z-index to ensure it's always on top */}
                <footer
                    className="bg-blue-500/90 backdrop-blur-sm p-4 text-center text-white absolute left-0 bottom-0 w-full z-50">
                    <p>&copy; 2024 My Website. Jahid Hasan, Marcus Dawodu, Michael Pan. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}