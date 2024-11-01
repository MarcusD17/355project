import SearchForm from "@/app/ui/search-form";

export default function Home() {
  return (
      <div className="bg-gray-100">
          {/* Navbar */}

          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-4xl font-semibold mb-4 text-gray-800">Find Your Next Recipe</h2>
                  <SearchForm />
              </div>
          </section>

          {/* Footer */}
          <footer className="bg-blue-500 p-4 text-center text-white mt-4 fixed bottom-0 w-full">
              <p>&copy; 2024 My Website. All rights reserved.</p>
          </footer>

      </div>
  );
}
