'use client';

import { useState } from 'react';

export default function NewRecipePage() {
    const [recipeData, setRecipeData] = useState({
        name: '',
        description: '',
        preparation_time: 0,
        cooking_time: 0,
        user_id: '', // Provide or set dynamically
        image_url: '',
        instructions: '',
        ingredients_list: ['']
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setRecipeData({ ...recipeData, [field]: e.target.value });
    };

    const handleArrayChange = (index: number, value: string) => {
        const newIngredients = [...recipeData.ingredients_list];
        newIngredients[index] = value;
        setRecipeData({ ...recipeData, ingredients_list: newIngredients });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeData)
            });

            if (!response.ok) throw new Error('Failed to add recipe');
            alert('Recipe added successfully!');
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('An error occurred while adding the recipe.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Recipe Name" onChange={(e) => handleChange(e, 'name')} />
                <textarea placeholder="Description" onChange={(e) => handleChange(e, 'description')} />
                <input type="number" placeholder="Preparation Time" onChange={(e) => handleChange(e, 'preparation_time')} />
                <input type="number" placeholder="Cooking Time" onChange={(e) => handleChange(e, 'cooking_time')} />
                <textarea placeholder="Instructions" onChange={(e) => handleChange(e, 'instructions')} />
                {recipeData.ingredients_list.map((ingredient, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Ingredient ${index + 1}`}
                        value={ingredient}
                        onChange={(e) => handleArrayChange(index, e.target.value)}
                    />
                ))}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Recipe</button>
            </form>
        </div>
    );
}
