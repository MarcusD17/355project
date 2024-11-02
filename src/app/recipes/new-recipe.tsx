'use client';

import { useState } from 'react';

export default function NewRecipePage() {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // example submission logic
        console.log({ recipeName, description, ingredients, instructions });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Recipe Name</label>
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ingredients</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Instructions</label>
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit Recipe
                </button>
            </form>
        </div>
    );
}
