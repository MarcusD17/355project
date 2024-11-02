import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { recipes, ingredients, recipeIngredients, users } from '../lib/placeholder-data';

// suppressing await error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const client = await db.connect();

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
     CREATE TABLE IF NOT EXISTS users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL
     );
   `;

    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
         INSERT INTO users (id, name, email, password)
         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
         ON CONFLICT (id) DO NOTHING;
       `;
        }),
    );

    return insertedUsers;
}

async function seedRecipes() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS recipes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      preparation_time INT NOT NULL,
      cooking_time INT NOT NULL,
      user_id UUID,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      image_url TEXT,
      instructions TEXT NOT NULL, 
      ingredients_list TEXT[] NOT NULL
    );
  `;

    const insertedRecipes = await Promise.all(
        recipes.map(
            (recipe) => client.sql`
        INSERT INTO recipes (id, name, description, preparation_time, cooking_time, user_id, created_at, image_url, instructions, ingredients_list)
        VALUES (
            ${recipe.id}, 
            ${recipe.name}, 
            ${recipe.description}, 
            ${recipe.preparation_time}, 
            ${recipe.cooking_time}, 
            ${recipe.user_id}, 
            ${recipe.created_at}, 
            ${recipe.image_url},
            ${recipe.instructions}, 
            ARRAY[${recipe.ingredients_list.map(ingredient => `'${ingredient}'`).join(', ')}]::TEXT[]
        )
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );

    return insertedRecipes;
}


async function seedIngredients() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
    CREATE TABLE IF NOT EXISTS ingredients (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      unit VARCHAR(50) NOT NULL
    );
  `;

    const insertedIngredients = await Promise.all(
        ingredients.map(
            (ingredient) => client.sql`
        INSERT INTO ingredients (id, name, unit)
        VALUES (${ingredient.id}, ${ingredient.name}, ${ingredient.unit})
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );

    return insertedIngredients;
}

async function seedRecipeIngredients() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS recipe_ingredients (
      recipe_id UUID NOT NULL,
      ingredient_id UUID NOT NULL,
      quantity FLOAT NOT NULL,
      PRIMARY KEY (recipe_id, ingredient_id)
    );
  `;

    const insertedRecipeIngredients = await Promise.all(
        recipeIngredients.map(
            (recipeIngredient) => client.sql`
        INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity)
        VALUES (${recipeIngredient.recipe_id}, ${recipeIngredient.ingredient_id}, ${recipeIngredient.quantity})
        ON CONFLICT (recipe_id, ingredient_id) DO NOTHING;
      `,
        ),
    );

    return insertedRecipeIngredients;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedUsers();
        await seedRecipes();
        await seedIngredients();
        await seedRecipeIngredients();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}