import Navbar from "@/app/ui/navbar";
import NavbarIcon from "@/app/ui/navbar-icons";

export default function Home() {
  return (
      <div className="bg-gray-100">
          {/* Navbar */}

          {/* Hero Section */}
          <section className="mt-16 bg-gray-200 h-64 flex items-center">
              <div className="container mx-auto text-center">
                  <h2 className="text-3xl font-bold">Welcome to My Website</h2>
                  <p className="mt-2 text-gray-600">This is a simple hero section using Tailwind CSS.</p>
                  <a href="#" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">Get Started</a>
              </div>
          </section>

          {/* About Section */}
          <section className="py-16 bg-white">
              <div className="container mx-auto text-center">
                  <h3 className="text-2xl font-semibold">About Us</h3>
                  <p className="mt-4 text-gray-600">We are committed to providing the best service possible. Our team is
                      dedicated to your success!</p>
              </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-gray-200">
              <div className="container mx-auto text-center">
                  <h3 className="text-2xl font-semibold">Our Services</h3>
                  <ul className="mt-4 text-gray-600">
                      <li>✔️ Service One</li>
                      <li>✔️ Service Two</li>
                      <li>✔️ Service Three</li>
                  </ul>
              </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 bg-white">
              <div className="container mx-auto text-center">
                  <h3 className="text-2xl font-semibold">Contact Us</h3>
                  <p className="mt-4 text-gray-600">Feel free to reach out to us anytime!</p>
                  <a href="#" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">Get in Touch</a>
              </div>
          </section>

          {/* Footer */}
          <footer className="bg-blue-500 p-4 text-center text-white mt-4">
              <p>&copy; 2024 My Website. All rights reserved.</p>
          </footer>
      </div>
  );
}
