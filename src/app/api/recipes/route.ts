import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // Parse the incoming JSON data
        const { name, description, ingredients, instructions } = await req.json();

        // Validate input data
        if (!name || !description || !Array.isArray(ingredients) || !instructions) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Insert the new recipe into the database
        await sql`
            INSERT INTO recipes (name, description, ingredients_list, instructions)
            VALUES (${name}, ${description}, ${ingredients}, ${instructions})
        `;

        // Return success response
        return NextResponse.json({ message: 'Recipe added successfully!' });
    } catch (error) {
        // Log and return an error response
        console.error('Error adding recipe:', error);
        return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
    }
}
