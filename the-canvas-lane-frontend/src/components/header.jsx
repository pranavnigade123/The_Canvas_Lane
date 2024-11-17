import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className='bg-white p-4 flex items-center justify-between shadow'>
      {/* Logo */}
      <Link to='/' className='flex items-center'>
        <img src='/tcl.png' alt='EventEase Logo' className='h-16 mr-8' /> {/* Increased the logo size */}
        <span className="text-black text-xl font-bold">Explore</span>
      </Link>

      {/* Search Bar */}
      <div className="relative flex items-center w-1/3 bg-gray-100 rounded-full"> {/* Shortened search bar width */}
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent py-2 px-10 text-sm text-gray-700 rounded-full focus:outline-none"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        <SignedOut>
          <div className="flex space-x-4">
            <SignInButton>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100">
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

        {/* User Profile for Signed In State */}
        <SignedIn>
          <div className="flex space-x-4">
            <Link to="/add-portfolio" className="border px-4 py-2 text-black rounded-full hover:bg-gray-100">
              Share Your Work
            </Link>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
