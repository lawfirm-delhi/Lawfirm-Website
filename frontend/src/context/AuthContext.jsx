import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('client_token'));
  const [loading, setLoading] = useState(true);

  // This is a simplified client auth implementation since we removed the original complex one
  useEffect(() => {
    if (token) {
      try {
        // Just decode or assume logged in if token exists
        // A real app would verify with the backend here. For now, we trust the token presence.
        const storedUser = localStorage.getItem('client_profile');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error restoring auth state', err);
      }
    }
    setLoading(false);
  }, [token]);

  const login = (data) => {
    localStorage.setItem('client_token', data.tokens.accessToken);
    localStorage.setItem('client_profile', JSON.stringify(data.user));
    setToken(data.tokens.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('client_profile');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
