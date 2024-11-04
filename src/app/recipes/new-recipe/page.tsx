'use client';

import { useState } from 'react';

import RecipeForm from "@/app/ui/recipes/add-recipe";
import Footer from "@/app/ui/footer";

export default function NewRecipePage() {
    const [message] = useState('');

    return (
        <div className="max-w-4xl mx-auto p-4 mt-24">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold mb-4">Add a New Recipe</h1>
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <RecipeForm/>
            <Footer />
        </div>

    );
}