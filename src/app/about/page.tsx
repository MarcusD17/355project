'use client';



export default function AboutPage() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl mx-auto p-8 mt-24 text-center">

                <h1 className="text-5xl font-bold text-blue-600 mb-6 animate-fadeIn">About Us</h1>


                <p className="text-lg text-gray-800 mb-4 animate-fadeIn delay-200">
                    Welcome to our recipe-sharing community! We are passionate about making cooking accessible and enjoyable for everyone.
                </p>
                <p className="text-lg text-gray-800 mb-6 animate-fadeIn delay-400">
                    Our platform is designed to help you find delicious recipes quickly, so you can get cooking without any hassle.
                    Whether you're a beginner or an experienced chef, we provide easy-to-follow steps to give you confidence in the kitchen.
                </p>
                <p className="text-lg text-gray-800 mb-8 animate-fadeIn delay-600">
                    Join us and explore a world of culinary inspiration. Let's cook something amazing together!
                </p>


                <div className="mt-8">
                    <img
                        src="https://raw.githubusercontent.com/MarcusD17/355project/refs/heads/master/src/app/public/images/recipeBook.jpg"
                        alt="Cooking Inspiration"
                        className="w-full max-w-md rounded-lg shadow-lg animate-fadeInUp"
                    />
                </div>


                <div className="mt-10">
                    <a
                        href="/recipes/recipe-search"
                        className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce"
                    >
                        Start Exploring Recipes
                    </a>
                </div>
            </div>
        </div>
    );
}
