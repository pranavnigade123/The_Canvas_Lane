// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from '@clerk/clerk-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { session } = useSession();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (session) {
        try {
          const sessionToken = await session.getToken();
          setToken(sessionToken);
          console.log('Session Token:', sessionToken); // Log the token for manual access
        } catch (error) {
          console.error('Error fetching session token:', error);
        }
      }
    };
    fetchToken();
  }, [session]);

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
