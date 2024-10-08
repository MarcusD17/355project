// This file contains placeholder data that you'll be replacing with real data
const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];
const recipes = [
    { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Pasta', description: 'Delicious pasta recipe', preparation_time: 15, cooking_time: 30 },
    // Other recipes...
];

const ingredients = [
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Pasta', unit: 'grams' },
    { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Salt', unit: 'grams' },
    // Other ingredients...
];

const recipeIngredients = [
    { recipe_id: '550e8400-e29b-41d4-a716-446655440001', ingredient_id: '550e8400-e29b-41d4-a716-446655440002', quantity: 200 },
    { recipe_id: '550e8400-e29b-41d4-a716-446655440001', ingredient_id: '550e8400-e29b-41d4-a716-446655440003', quantity: 5 },
    // Other recipe ingredients...
];


export { users, recipes, ingredients, recipeIngredients };
