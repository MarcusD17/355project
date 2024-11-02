import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    let client;
    try {
        // Connect to the database
        client = await sql.connect();
        console.log("Connected to the database successfully.");

        // Parse and log incoming data
        const {
            name,
            description,
            preparation_time,
            cooking_time,
            user_id,
            image_url,
            instructions,
            ingredients_list
        } = await req.json();

        console.log("Received data:", {
            name, description, preparation_time, cooking_time, user_id, image_url, instructions, ingredients_list
        });

        // Validate input
        if (!name || !description || !preparation_time || !cooking_time || !instructions || !Array.isArray(ingredients_list)) {
            console.error("Validation failed: Missing or invalid input data.");
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Insert the new recipe into the database
        await client.sql`
            INSERT INTO recipes (name, description, preparation_time, cooking_time, user_id, image_url, instructions, ingredients_list)
            VALUES (
                ${name}, 
                ${description}, 
                ${preparation_time}, 
                ${cooking_time}, 
                ${user_id}, 
                ${image_url || null}, 
                ${instructions}, 
                ARRAY[${ingredients_list.map(ingredient => `'${ingredient}'`).join(', ')}]::TEXT[]
            )
        `;
        console.log("Recipe added successfully.");

        return NextResponse.json({ message: 'Recipe added successfully!' });
    } catch (error) {
        console.error("Error adding recipe:", error);
        return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
    } finally {
        if (client) client.release();
    }
}
