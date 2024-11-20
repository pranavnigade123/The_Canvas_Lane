import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-yellow-400 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-4 text-lg text-gray-700">
          Explore. Create. Connect. At The Canvas Lane, we empower artists and designers to showcase their work to the world.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Section 1 */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-gray-800">We make sure your creativity is showcased properly</h2>
          <p className="text-gray-600 mt-4">
            The Canvas Lane is a platform where creativity meets opportunity. Artists and designers can create stunning portfolios
            to inspire, connect, and be recognized.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, index) => (
              <img
                key={index}
                src={`https://via.placeholder.com/200x150?text=Image+${index + 1}`}
                alt={`Sample Portfolio ${index + 1}`}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex flex-col sm:flex-row items-center gap-8 mb-16">
          <div className="sm:w-1/2">
            <img
              src="https://via.placeholder.com/500x350?text=Teamwork"
              alt="Empowering Artists"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="sm:w-1/2">
            <h3 className="text-xl font-semibold text-gray-800">
              We empower artists and designers
            </h3>
            <p className="text-gray-600 mt-4">
              Our mission is to help creative individuals grow their presence, gain visibility, and connect with like-minded creators.
              Whether you are a painter, photographer, or graphic designer, The Canvas Lane is your platform for inspiration and
              collaboration.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="text-center mb-16">
          <h3 className="text-xl font-semibold text-gray-800">
            Helping creativity flourish faster and better
          </h3>
          <p className="text-gray-600 mt-4">
            From professional portfolios to networking with industry leaders, The Canvas Lane is your tool for turning creativity into
            a career.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800">Professional Portfolios</h4>
              <p className="text-gray-600 mt-2">
                Showcase your projects with beautifully designed portfolio templates.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800">Global Exposure</h4>
              <p className="text-gray-600 mt-2">
                Connect with professionals and clients worldwide to gain recognition.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-800">Guaranteed Impact</h4>
              <p className="text-gray-600 mt-2">
                Inspire and be inspired by the creative community at The Canvas Lane.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} The Canvas Lane. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
