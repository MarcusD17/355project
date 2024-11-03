'use client';

import { useState } from 'react';

import RecipeForm from "@/app/ui/recipes/add-recipe";

export default function NewRecipePage() {
    const [message] = useState('');

    return (
        <div className="max-w-4xl mx-auto p-4 mt-24">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <RecipeForm/>
            <footer
                className="bg-blue-500/90 backdrop-blur-sm p-4 text-center text-white absolute left-0 bottom-0 w-full z-50">
                <p>&copy; 2024 My Website. Jahid Hasan, Marcus Dawodu, Michael Pan. All rights reserved.</p>
            </footer>
        </div>

    );
}