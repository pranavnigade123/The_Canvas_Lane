import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme context

const Header = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav
      className={`p-4 flex items-center justify-between shadow ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold">
        <span className="text-blue-500">The</span>
        <span className="text-gray-400">Canvas</span>
        <span className="text-pink-500">Lane</span>
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className={`sm:hidden text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Main Navigation */}
      <div
        className={`fixed sm:static top-0 left-0 w-full sm:w-auto h-screen sm:h-auto bg-white sm:bg-transparent z-50 sm:z-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 p-8 sm:p-0 transition-transform transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        } ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
      >
        {/* Search Bar */}
        <div className={`relative flex items-center w-full sm:w-1/3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-full`}>
          <FaSearch className={`absolute left-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
          <input
            type="text"
            placeholder="Search..."
            className={`w-full bg-transparent py-2 px-10 text-sm rounded-full focus:outline-none ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full ${
            theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {/* Navigation Links */}
        <SignedOut>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SignInButton>
              <button
                className={`px-4 py-2 border rounded-full ${
                  theme === 'dark'
                    ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Log in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                Sign in
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/add-portfolio"
              className={`px-4 py-2 border rounded-full ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              Share Your Work
            </Link>
            <Link
              to="/portfolio-list"
              className={`px-4 py-2 rounded-full ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Explore
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
