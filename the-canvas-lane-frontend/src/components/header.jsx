import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`p-4 flex items-center justify-between shadow-md ${
        theme === 'dark' ? 'bg-black-900 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-extrabold space-x-1">
        <span className="text-blue-500">The</span>
        <span className="text-gray-400">Canvas</span>
        <span className="text-pink-500">Lane</span>
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        className="block md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {/* Search Bar */}
        <div
          className={`relative flex items-center w-1/3 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          } rounded-full`}
        >
          <FaSearch
            className={`absolute left-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
            }`}
          />
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
          className={`px-4 py-2 border rounded-full text-sm font-medium ${
            theme === 'dark'
              ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-black hover:bg-gray-100'
          }`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <SignedOut>
          <div className="flex items-center gap-4">
            <SignInButton>
              <button
                className={`px-4 py-2 border rounded-full text-sm font-medium ${
                  theme === 'dark'
                    ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Log in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 border rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                Sign up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <Link
              to="/add-portfolio"
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              Share Your Work
            </Link>
            <Link
              to="/portfolio-list"
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/my-profile"
              className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      height: '24px',
                      width: '24px',
                    },
                  },
                }}
              />
              <span>My Profile</span>
            </Link>
          </div>
        </SignedIn>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          className={`absolute top-16 left-0 w-full z-20 ${
            theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-black'
          } flex flex-col items-center gap-6 py-6 shadow-lg md:hidden`}
        >
          <div className="flex flex-col gap-4 items-center w-full px-4">
            {/* Search Bar */}
            <div
              className={`relative flex items-center w-full ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              } rounded-full`}
            >
              <FaSearch
                className={`absolute left-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                }`}
              />
              <input
                type="text"
                placeholder="Search..."
                className={`w-full bg-transparent py-2 px-10 text-sm rounded-full focus:outline-none ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <SignedOut>
              <div className="flex flex-col gap-4 items-center w-full">
                <SignInButton>
                  <button
                    className={`px-4 py-2 border rounded-full text-sm font-medium ${
                      theme === 'dark'
                        ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 border rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                    Sign up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-4 items-center w-full">
                <Link
                  to="/add-portfolio"
                  className={`px-4 py-2 border rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-black hover:bg-gray-100'
                  }`}
                >
                  Share Your Work
                </Link>
                <Link
                  to="/portfolio-list"
                  className={`px-4 py-2 border rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-black hover:bg-gray-100'
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/my-profile"
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-black hover:bg-gray-100'
                  }`}
                >
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: {
                          height: '24px',
                          width: '24px',
                        },
                      },
                    }}
                  />
                  <span>My Profile</span>
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
