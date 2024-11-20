import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useTheme } from '../context/ThemeContext'; // Import the theme context

const AppLayout = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  return (
    <div className={`app-layout ${theme}`}> {/* Apply theme class */}
      <Header />
      <main className="min-h-screen p-4 transition-colors">
        <Outlet />
      </main>
      <footer className="p-4 text-center">
        <SignedOut>
          <p>Please sign in to access all features.</p>
        </SignedOut>
        <SignedIn>
          <p>Welcome to the platform!</p>
        </SignedIn>
        <button
          onClick={toggleTheme}
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </footer>
    </div>
  );
};

export default AppLayout;
