import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to silently refresh token on app load
    const checkAuth = async () => {
      try {
        const response = await api.post('/auth/refresh');
        const { accessToken } = response.data.data;
        setAuthToken(accessToken);
        
        // Fetch the user's full profile
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data.data);
      } catch (error) {
        setAuthToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { accessToken, user } = response.data.data;
    setAuthToken(accessToken);
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    await api.post('/auth/register', userData);
    // After registration, automatically log the user in
    return login(userData.email, userData.password);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuthToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
