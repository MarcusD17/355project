// app/recipes/page.tsx
import { Suspense } from 'react';
import RecipesTable from '@/app/ui/recipes/table';
import { fetchRecipesPages } from '@/app/lib/data';
import Pagination from '@/app/ui/recipes/pagination';
import { Metadata } from 'next';
import SearchForm from "@/app/ui/search-form";

export const metadata: Metadata = {
    title: 'Recipes',
};

export default async function Page({
    searchParams,
    }: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchRecipesPages(query);

    return (
        <main className="w-full max-w-7xl mx-auto p-4 md:p-6 mt-16">
            <div className="flex items-center justify-between gap-2 md:mt-8">
                <h1 className="text-xl md:text-2xl">Search Results</h1>
                <SearchForm />
                {query && (
                    <p className="text-sm text-gray-600">
                        Showing results for: {query}
                    </p>
                )}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <RecipesTable query={query} currentPage={currentPage} />
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    );
}