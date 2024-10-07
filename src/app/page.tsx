export default function Home() {
  return (
      <div className="bg-gray-100">
          {/* Navbar */}

          {/* Hero Section */}
          <section className="min-h-screen bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-4xl font-semibold mb-4 text-gray-800">Search for a Recipe</h2>
                  <input
                      type="text"
                      placeholder="Search..."
                      className="w-96 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2
                      focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  />
              </div>
          </section>

          {/* Footer */}
          <footer className="bg-blue-500 p-4 text-center text-white mt-4 fixed bottom-0 w-full">
              <p>&copy; 2024 My Website. All rights reserved.</p>
          </footer>
      </div>
  );
}
