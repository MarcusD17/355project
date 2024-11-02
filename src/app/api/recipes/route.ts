import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const client = await sql.connect();

    try {
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

        // Validate input
        if (!name || !description || !preparation_time || !cooking_time || !instructions || !Array.isArray(ingredients_list)) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Insert into database
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

        return NextResponse.json({ message: 'Recipe added successfully!' });
    } catch (error) {
        console.error('Error adding recipe:', error);
        return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
    } finally {
        client.release();
    }
}
