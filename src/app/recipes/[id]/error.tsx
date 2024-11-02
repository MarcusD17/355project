'use client';

export default function Error({
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex items-center justify-center h-screen">
            <main className="w-full max-w-7xl mx-auto p-4 mt-16">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
                    <p className="mt-2 text-gray-600">Failed to load recipe</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={reset}
                    >
                        Try again
                    </button>
                </div>
            </main>
        </div>
    );
}