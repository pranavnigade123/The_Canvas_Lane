import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioCard from "../components/PortfolioCard";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/ThemeContext";
import { TypewriterEffect } from "../components/TypewritterEffect";

const LandingPage = () => {
  const { token } = useAuth(); // Token from authentication context
  const { theme } = useTheme(); // Theme from ThemeContext
  const [portfolios, setPortfolios] = useState([]); // Portfolios state
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!token) {
        console.warn("[LandingPage] Token is not available yet. Waiting...");
        setError("Authentication token is not available. Please sign in.");
        return; // Exit if token is not ready
      }

      setLoading(true); // Set loading state
      try {
        // API call to fetch portfolios
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolios/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
            withCredentials: true, // Allow credentials
          }
        );

        if (Array.isArray(response.data)) {
          setPortfolios(response.data); // Update portfolios state
        } else {
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        setError("Failed to fetch portfolios.");
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    // Fetch portfolios when token is available
    if (token) {
      fetchPortfolios();
    }
  }, [token]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        theme === "dark" ? "bg-black-900 text-gray-300" : "bg-gray-200 text-black"
      }`}
    >
      {/* Hero Section */}
      <header
        className={`w-full py-16 text-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-black via-indigo-900 to-black text-white"
            : "bg-gradient-to-r from-black via-indigo-900 to-black text-white"
        }`}
      >
        <TypewriterEffect
          words={[{ text: "Welcome to The Canvas Lane" }]}
          className="text-center text-white"
          cursorClassName="bg-blue-500"
        />
        <p className="text-xl mt-4">
          Showcase your creativity and connect with a community of artists, designers, and visionaries.
        </p>
        <button
          className={`mt-6 px-8 py-3 rounded-full font-semibold ${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
              : "bg-white text-blue-500 hover:bg-gray-200"
          }`}
        >
          Get Started
        </button>
      </header>

      {/* Portfolios Section */}
      <section
        className={`w-full max-w-6xl mx-auto px-6 py-20 ${
          theme === "dark" ? "bg-black-900" : "bg-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Explore Portfolios</h2>

        {loading && <p className="text-center">Loading portfolios...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                mediaUrl={
                  portfolio.media[0]?.url
                    ? `${import.meta.env.VITE_BACKEND_URL}/${portfolio.media[0].url}`
                    : "https://via.placeholder.com/300"
                }
                userName={portfolio.userName || "Unknown User"}
                userProfilePic={
                  portfolio.userProfilePic || "https://via.placeholder.com/40"
                }
                portfolioTitle={portfolio.title || "Portfolio Title"}
                portfolioDescription={
                  portfolio.description || "No description available."
                }
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              />
            ))
          ) : (
            !loading && (
              <p className="text-center text-gray-600">
                No portfolios available to display.
              </p>
            )
          )}
        </div>
      </section>

      {/* About Section */}
      <section
        className={`w-full max-w-4xl mx-auto px-6 py-20 text-center ${
          theme === "dark" ? "bg-black-900 text-gray-300" : "bg-gray-200 text-black"
        }`}
      >
        <h2 className="text-3xl font-semibold">About The Canvas Lane</h2>
        <p className="mt-4">
          The Canvas Lane is your stage to showcase creativity without limits.
          Whether you’re an artist, designer, or photographer, this is the place
          to bring your work to life and connect with a community that celebrates
          creativity.
        </p>
      </section>

      {/* Footer */}
      <footer
        className={`w-full py-8 text-center ${
          theme === "dark"
            ? "bg-black-950 text-gray-400"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} The Canvas Lane. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
