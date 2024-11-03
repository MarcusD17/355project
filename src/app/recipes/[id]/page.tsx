// app/recipes/[id]/page.tsx
import SearchForm from "@/app/ui/search-form";
import { fetchRecipeById } from "@/app/lib/data"; // You'll need to create this function
import { unstable_noStore as noStore } from 'next/cache';

export default async function RecipePage({ params }: { params: { id: string } }) {
    noStore();
    const recipe = await fetchRecipeById(params.id);

    if (!recipe) {
        return (
            <main className="w-full max-w-7xl mx-auto p-4 md:p-6 mt-16">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Recipe not found</h1>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full max-w-7xl mx-auto p-4 md:p-6 mt-16">
            {/* Navbar */}
            <div className="flex items-center justify-between gap-2 md:mt-8">
                <h1 className="text-xl md:text-2xl">Another Recipe?</h1>
                <SearchForm/>
            </div>

            {/* Recipe Content */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Image */}
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <img
                        src={recipe.image_url || '/api/placeholder/800/600'}
                        alt={recipe.name}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Column - Recipe Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
                        <p className="mt-2 text-gray-600">By {recipe.author_name}</p>
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                            <span>Prep: {recipe.preparation_time} min</span>
                            <span>•</span>
                            <span>Cook: {recipe.cooking_time} min</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                        <p className="mt-2 text-gray-600">{recipe.description}</p>
                    </div>


                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Ingredients</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            {Array.isArray(recipe.ingredients_list) && recipe.ingredients_list.length > 0 ? (
                                recipe.ingredients_list.map((ingredient, index) => (
                                    <li key={index} className="text-gray-700">
                                        {ingredient}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500">No ingredients listed</li>
                            )}
                        </ul>
                    </div>


                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Instructions</h2>
                        <div className="text-gray-700 whitespace-pre-wrap">
                            {recipe.instructions}
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer
                className="bg-blue-500/90 backdrop-blur-sm p-4 text-center text-white absolute left-0 bottom-0 w-full z-50">
                <p>&copy; 2024 My Website. Jahid Hasan, Marcus Dawodu, Michael Pan. All rights reserved.</p>
            </footer>
        </main>
    );
}