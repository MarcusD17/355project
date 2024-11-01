import React from 'react';
import {fetchFilteredRecipes} from "@/app/lib/data";


export default async function RecipesTable({
                                               query,
                                               currentPage,
                                           }: {
    query: string;
    currentPage: number;
}) {
    const recipes = await fetchFilteredRecipes(query, currentPage);

    if (!recipes || recipes.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <p className="text-gray-600">No recipes found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Recipe</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {recipes.map((recipe) => (
                    <tr
                        key={recipe.id}
                        className="hover:bg-gray-50 transition-colors relative h-16"
                        style={{
                            backgroundImage: `
                  linear-gradient(to right, 
                    transparent, 
                    white 50%
                  ),
                  url('${recipe.image_url || '/api/placeholder/400/64'}')
                `,
                            backgroundSize: 'cover',
                            backgroundPosition: 'left center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <td className="px-6 py-4 text-sm text-gray-900 relative z-10">
                            {recipe.name}
                            <div className="text-xs text-gray-500">
                                Prep: {recipe.preparation_time}min | Cook: {recipe.cooking_time}min
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 relative z-10">
                            <div className="line-clamp-2">{recipe.description}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 relative z-10">
                            <div>{recipe.author_name}</div>
                            <div className="text-xs text-gray-500">{recipe.author_email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 relative z-10">
                            {new Date(recipe.created_at).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}