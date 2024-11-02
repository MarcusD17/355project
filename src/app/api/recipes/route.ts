import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name, description, ingredients, instructions } = await req.json();

        // Insert the new recipe into your database
        await sql`
            INSERT INTO recipes (name, description, ingredients_list, instructions)
            VALUES (${name}, ${description}, ${ingredients}, ${instructions})
        `;

        return NextResponse.json({ message: 'Recipe added successfully!' });
    } catch (error) {
        console.error('Error adding recipe:', error);
        return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
    }
}
