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
    { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Pasta', description: 'Delicious pasta recipe', preparation_time: 15, cooking_time: 30,
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a', created_at: '2024-07-12T12:00:00Z',
        image_url: 'https://imgs.search.brave.com/zKGYlZ0kH2hXx6SIuRAz5uQ37O7VwTkw5yYvxjQ043E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/cGFzdGEtd2l0aC1z/aHJpbXAtdjAtbHoy/NXdwem9tanhkMS5q/cGVnP3dpZHRoPTY0/MCZjcm9wPXNtYXJ0/JmF1dG89d2VicCZz/PTFjNzZiOTZhOTJm/NmQ2NDBkMjA1Y2Q2/ZmNhZTg4Y2JjN2I2/MzA0OTI'},
    { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Ceasar Salad', description: 'Simple yet, flavourful cesar salad', preparation_time: 15, cooking_time: 30,
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a', created_at: '2024-07-12T12:00:00Z',
        image_url: 'https://imgs.search.brave.com/jqXsdefUjn7VhEs-9PrFxeKYcc1O4mC3_TE7aHtmwTA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5zcGlyZWR0YXN0/ZS5uZXQvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDcvSG9t/ZW1hZGUtQ2Flc2Fy/LVNhbGFkLVJlY2lw/ZS0xMjAwLmpwZw'},
    { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Mac and Cheese', description: 'Creamy Mac and Cheese', preparation_time: 15, cooking_time: 30,
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a', created_at: '2024-07-12T12:00:00Z',
        image_url: 'https://imgs.search.brave.com/sf2z-mZIHgVmwX7_6IfTlcqHEoevIX_T-cv1UTHuBok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVjaXBldGluZWF0/cy5jb20vdGFjaHlv/bi8yMDE4LzA1L0Jh/a2VkLU1hYy1hbmQt/Q2hlZXNlLWluLWJv/d2xfNy5qcGc'},
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
