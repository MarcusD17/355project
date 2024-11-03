import { sql } from '@vercel/postgres';
import { Recipe } from './definitions';

const ITEMS_PER_PAGE = 6;

// Function to fetch filtered recipes with pagination
export async function fetchFilteredRecipes(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const recipes = await sql<Recipe>`
            SELECT
                recipes.id,
                recipes.name,
                recipes.description,
                recipes.preparation_time,
                recipes.cooking_time,
                recipes.user_id,
                recipes.created_at,
                recipes.image_url,
                users.name as author_name,
                users.email as author_email
            FROM recipes
            JOIN users ON recipes.user_id = users.id
            WHERE
                users.name ILIKE ${`%${query}%`} OR
                users.email ILIKE ${`%${query}%`} OR
                recipes.id::text ILIKE ${`%${query}%`} OR
                recipes.created_at::text ILIKE ${`%${query}%`} OR
                recipes.name ILIKE ${`%${query}%`}
            ORDER BY recipes.created_at DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

        return recipes.rows; // Use .rows to access the results
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch recipes.');
    }
}

// Function to fetch the total number of pages for the given query
export async function fetchRecipesPages(query: string) {
    try {
        const count = await sql`
            SELECT COUNT(*)
            FROM recipes
            JOIN users ON recipes.user_id = users.id
            WHERE
                users.name ILIKE ${`%${query}%`} OR
                users.email ILIKE ${`%${query}%`} OR
                recipes.id::text ILIKE ${`%${query}%`} OR
                recipes.created_at::text ILIKE ${`%${query}%`} OR
                recipes.name ILIKE ${`%${query}%`}
        `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of recipes.');
    }
}

// Function to fetch a recipe by its ID
export async function fetchRecipeById(id: string) {
    try {
        const data = await sql`
            SELECT 
                recipes.*,
                recipes.instructions,
                recipes.ingredients_list,
                users.name as author_name,
                users.email as author_email
            FROM recipes
            LEFT JOIN users ON recipes.user_id = users.id
            WHERE recipes.id = ${id}
        `;

        const recipe = data.rows[0]; // Use .rows to access the results
        console.log('Fetched recipe:', recipe);

        if (!recipe) {
            throw new Error('Recipe not found');
        }

        // Ensure all properties match the Recipe type
        return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            page_description: recipe.page_description,
            preparation_time: recipe.preparation_time,
            cooking_time: recipe.cooking_time,
            user_id: recipe.user_id,
            created_at: recipe.created_at,
            image_url: recipe.image_url,
            ingredients_list: Array.isArray(recipe.ingredients_list) ? recipe.ingredients_list : [],
            instructions: recipe.instructions,
            author_name: recipe.author_name,
            author_email: recipe.author_email
        };
    } catch (error) {
        console.error('Failed to fetch recipe:', error);
        throw new Error('Failed to fetch recipe');
    }
}

// Function to add a new recipe
export async function addRecipe(recipe: {
    name: string;
    description: string;
    preparation_time: number;
    cooking_time: number;
    user_id: string;
    image_url: string;
    ingredients_list: string[];
    instructions: string;
}) {
    try {
        // Ensure all properties are present
        const { name, description, preparation_time, cooking_time, user_id, image_url, ingredients_list, instructions } = recipe;

        // Insert the recipe into the database
        await sql`
            INSERT INTO recipes (
                name,
                description,
                preparation_time,
                cooking_time,
                user_id,
                image_url,
                ingredients_list,
                instructions
            ) VALUES (
                ${name},
                ${description},
                ${preparation_time},
                ${cooking_time},
                ${user_id},
                ${image_url},
                ${sql.array(ingredients_list)},
                ${instructions}
            )
        `;

        return { message: 'Recipe added successfully' };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add recipe');
    }
}
