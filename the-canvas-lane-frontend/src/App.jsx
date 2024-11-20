import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import Add_portfoliio from './pages/Add-portfoliio';
import Portfolio from './pages/portfolio';
import Saved_portfolio from './pages/saved-portfolio';
import MyPortfolio from './pages/my-portfolio';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Trending from './pages/trending';
import AboutUs from './pages/aboutus';
import PortfolioListing from './pages/portfolio-listing';
import { AuthProvider } from './context/authContext';
import { ThemeProvider } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    element: <AppLayout />, // AppLayout is where you'll add the theme toggle button
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element: <Onboarding />
      },
      {
        path: '/aboutus',
        element: <AboutUs />
      },
      {
        path: '/add-portfolio',
        element: (
          <>
            <SignedIn>
              <Add_portfoliio />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      },
      {
        path: '/portfolio/:id',
        element: <Portfolio />
      },
      {
        path: '/saved-portfolio',
        element: (
          <>
            <SignedIn>
              <Saved_portfolio />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      },
      {
        path: '/trending-portfolio',
        element: <Trending />
      },
      {
        path: '/portfolio-list',
        element: <PortfolioListing />
      },
      {
        path: '/my-portfolio',
        element: (
          <>
            <SignedIn>
              <MyPortfolio />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider> {/* Added ThemeProvider here */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
