// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Recipe = {
    id: string;
    name: string;
    description: string;
    preparation_time: number;
    cooking_time: number;
    ingredients: string;
    user_id: string;
    created_at: string;
    image_url: string;
    author_name: string;
    author_email: string;
    // In TypeScript, this is called a string union type.
    // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
    // {/* status: 'pending' | 'paid'; */}
};

export type Ingriedents = {
    id: string;
    name: string;
};

export type Recipe_Ingredients = {
    id: string;
    name: string;
    image_url: string;
    email: string;
    amount: string;
};

export type RecipeTable = {
    id: string;
    recipes: Recipe[];
    ingredients: Ingriedents[];
    author: string;
    date: string;
};


