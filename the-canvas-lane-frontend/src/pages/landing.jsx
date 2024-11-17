import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
    {/* Hero Section */}
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20 text-center">
      <h1 className="text-5xl font-bold">Welcome to The Canvas Lane</h1>
      <p className="text-xl mt-4">
        Showcase your creativity and connect with a community of artists, designers, and visionaries.
      </p>
      <button className="mt-6 px-8 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-200">
        Get Started
      </button>
    </header>

    {/* Featured Portfolios Section */}
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Featured Portfolios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((portfolio, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src={`https://via.placeholder.com/300x200?text=Portfolio+${index + 1}`}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">Portfolio Title {index + 1}</h3>
              <p className="text-gray-600 mt-2">
                A short description of the portfolio. Showcase your design, photography, or any creative work.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Portfolio
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* About Section */}
    <section className="w-full max-w-4xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold text-gray-800">About The Canvas Lane</h2>
      <p className="text-gray-600 mt-4">
        The Canvas Lane is your stage to showcase creativity without limits. Whether you’re an artist, designer, or photographer, this is the
        place to bring your work to life and connect with a community that celebrates creativity.
      </p>
    </section>

    {/* Join Us Section */}
    <section className="w-full bg-blue-500 text-white py-20 text-center">
      <h2 className="text-3xl font-semibold">Join Our Community</h2>
      <p className="text-xl mt-4">
        Discover inspiration, get noticed, and inspire others. Step into a world where every project speaks and every idea matters.
      </p>
      <button className="mt-6 px-8 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-200">
        Sign Up Now
      </button>
    </section>

    {/* Footer */}
    <footer className="w-full bg-gray-800 text-white py-8 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} The Canvas Lane. All rights reserved.</p>
    </footer>
  </div>
  );
};

export default LandingPage;

