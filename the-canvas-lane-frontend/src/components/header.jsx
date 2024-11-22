import React from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { FaSearch } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 flex items-center justify-between shadow-md ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center text-xl font-extrabold">
        <span className="text-blue-500">The</span>
        <span className="text-gray-400 mx-1">Canvas</span>
        <span className="text-pink-500">Lane</span>
      </Link>

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

      {/* Theme Toggle and Navigation Buttons */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 border rounded-full text-sm font-medium ${
            theme === 'dark'
              ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
              : 'border-gray-300 text-black hover:bg-gray-100'
          }`}
          style={{ height: '40px', display: 'flex', alignItems: 'center' }}
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
            {/* Share Your Work */}
            <Link
              to="/add-portfolio"
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
              style={{ height: '40px', display: 'flex', alignItems: 'center' }}
            >
              Share Your Work
            </Link>

            {/* Explore */}
            <Link
              to="/portfolio-list"
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
              style={{ height: '40px', display: 'flex', alignItems: 'center' }}
            >
              Explore
            </Link>

            {/* My Profile */}
            <Link
              to="/my-profile"
              className={`px-4 py-2 border rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'border-gray-500 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
              style={{ height: '40px', display: 'flex', alignItems: 'center' }}
            >
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      marginRight: '8px',
                      height: '24px',
                      width: '24px',
                    },
                  },
                }}
              />
              My Profile
            </Link>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
