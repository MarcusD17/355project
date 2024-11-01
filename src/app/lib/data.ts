import { sql } from '@vercel/postgres';
import {
    Recipe,
} from './definitions';

const ITEMS_PER_PAGE = 6;

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

        return recipes.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch recipes.');
    }
}

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