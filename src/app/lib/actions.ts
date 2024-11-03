'use server';

import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { randomUUID } from 'crypto';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    preparation_time: z.coerce.number() || null,
    cooking_time: z.coerce.number() || null,
    user_id: z.string().optional(),
    image_url: z.string().optional(),
    created_at: z.string().optional(),
    instructions: z.string(),
    ingredients_list: z.string(),
});

const CreateRecipe = FormSchema;  // Remove the omit since we want all fields

export type State = {
    errors?: {
        id: string;
        name?: string[];
        description?: string[];
        preparation_time?: number[];
        cooking_time?: number[];
        user_id?: string;
        image_url?: string;
        created_at?: Date;
        instructions?: string[];
        ingredients_list?: string[];
    };
    message?: string | null;
};

async function generateUniqueUserId() {
    let userId;

    while (true) {
        userId = randomUUID();
        const result = await sql`SELECT 1 FROM users WHERE id = ${userId} LIMIT 1;`;

        if (result.rowCount === 0) {
            // No collision found, break out of loop
            break;
        }
    }

    return userId;
}

export async function createRecipe(prevState: State, formData: FormData) {
    const id = await generateUniqueUserId();
    const user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

    console.log('id:', formData.get('id'));
    console.log('name:', formData.get('name'));
    console.log('description:', formData.get('description'));
    console.log('preparation_time:', formData.get('preparation_time'));
    console.log('cooking_time:', formData.get('cooking_time'));
    console.log('user_id:', formData.get('user_id'));
    console.log('image_url:', formData.get('image_url'));
    console.log('instructions:', formData.get('instructions'));
    console.log('ingredients_list:', formData.get('ingredients_list'));

    const validatedFields = CreateRecipe.safeParse({
        id,
        name: formData.get('name'),
        description: formData.get('description'),
        preparation_time: formData.get('preparation_time'),
        cooking_time: formData.get('cooking_time'),
        user_id,
        image_url: formData.get('image_url'),
        instructions: formData.get('instructions'),
        ingredients_list: formData.get('ingredients_list'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Recipe.',
        };
    }

    const {
        name,
        description,
        preparation_time,
        cooking_time,
        image_url,
        instructions,
        ingredients_list,
    } = validatedFields.data;

    const ingredientsArray = ingredients_list.split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

    const ingredientsForSQL = `{${ingredientsArray.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(',')}}`;

    try {
        await sql`
            INSERT INTO recipes (
                id,
                name,
                description,
                preparation_time,
                cooking_time,
                user_id,
                created_at,
                image_url,
                instructions,
                ingredients_list
            ) VALUES (
                ${id},
                ${name},
                ${description},
                ${preparation_time},
                ${cooking_time},
                ${user_id}, -- Hard-coded user ID
                CURRENT_TIMESTAMP,
                ${image_url || null},
                ${instructions},
                ${ingredientsForSQL}::text[]
            )
        `;


    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Recipe.',
        };
    }
    revalidatePath('/recipes/recipe-search');
    return redirect('/recipes/recipe-search');
}