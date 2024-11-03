'use client';

import { useState } from 'react';
import { addRecipe } from '@/app/lib/data'; // Import the addRecipe function

export default function NewRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [preparationTime, setPreparationTime] = useState(0);
    const [cookingTime, setCookingTime] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const ingredientsList = ingredients.split(',').map((item) => item.trim());

        try {
            // Temporary user ID for testing
            const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

            const response = await addRecipe({
                name: recipeName,
                description,
                preparation_time: preparationTime,
                cooking_time: cookingTime,
                user_id: userId,
                image_url: imageURL,
                ingredients_list: ingredientsList,
                instructions,
            });

            setMessage(response.message);
            // Clear the form after successful submission
            setRecipeName('');
            setDescription('');
            setPreparationTime(0);
            setCookingTime(0);
            setImageURL('');
            setIngredients('');
            setInstructions('');
        } catch (error) {
            console.error('Failed to add recipe:', error);
            setMessage('Failed to add recipe');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 mt-8">
            <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Recipe Name</label>
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Preparation Time (minutes)</label>
                    <input
                        type="number"
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Cooking Time (minutes)</label>
                    <input
                        type="number"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(Number(e.target.value))}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ingredients (comma-separated)</label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit Recipe
                </button>
            </form>
        </div>
    );
}
