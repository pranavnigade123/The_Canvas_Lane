import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <SignedOut>
          <p>Please sign in to access all features.</p>
        </SignedOut>
        <SignedIn>
          <p>Welcome to the platform!</p>
        </SignedIn>
      </footer>
    </div>
  );
};

export default AppLayout;
