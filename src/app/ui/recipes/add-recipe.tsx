'use client';

import { useFormState } from 'react-dom';
import { createRecipe, State } from '@/app/lib/actions';


export default function RecipeForm() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const initialState: State = { message: null, errors: {} };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [state, dispatch] = useFormState(createRecipe, initialState);

    return (
        <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium">Recipe Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Ex. Spaghetti Bolognese"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="name-error"
                />
                {state.errors?.name && (
                    <div id="name-error" className="text-red-500 text-sm">
                        {state.errors.name.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    placeholder="Enter Description"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="description-error"
                />
                {state.errors?.description && (
                    <div id="description-error" className="text-red-500 text-sm">
                        {state.errors.description.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Preparation Time (minutes)</label>
                <input
                    type="number"
                    name="preparation_time"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="prep-time-error"
                />
                {state.errors?.preparation_time && (
                    <div id="prep-time-error" className="text-red-500 text-sm">
                        {state.errors.preparation_time.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Cooking Time (minutes)</label>
                <input
                    type="number"
                    name="cooking_time"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="cook-time-error"
                />
                {state.errors?.cooking_time && (
                    <div id="cook-time-error" className="text-red-500 text-sm">
                        {state.errors.cooking_time.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Image URL (Optional)</label>
                <input
                    type="text"
                    name="image_url"
                    placeholder="Enter URL Here"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    aria-describedby="image-url-error"
                />
                {state.errors?.image_url && (
                    <div id="image-url-error" className="text-red-500 text-sm">
                        {state.errors.image_url.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Ingredients (comma-separated)</label>
                <input
                    type="text"
                    name="ingredients_list"
                    placeholder="Ex. Eggs, Cheese, Flour"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="ingredients-error"
                />
                {state.errors?.ingredients_list && (
                    <div id="ingredients-error" className="text-red-500 text-sm">
                        {state.errors.ingredients_list.join(', ')}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium">Instructions</label>
                <textarea
                    name="instructions"
                    placeholder="Gather all ingredients. Preheat the oven to 350 degrees F (175 degrees C)..."
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out pl-4"
                    required
                    aria-describedby="instructions-error"
                />
                {state.errors?.instructions && (
                    <div id="instructions-error" className="text-red-500 text-sm">
                        {state.errors.instructions.join(', ')}
                    </div>
                )}
            </div>


            {state.message && (
                <div className="text-red-500 text-sm">{state.message}</div>
            )}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-4 hover:bg-blue-600 transition duration-200"
                >
                    Submit Recipe
                </button>
            </div>
        </form>
    );
}