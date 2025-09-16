

import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await apiClient.get('/auth/session');
        setUser(response.data.employee);
      } catch (error) {
        console.error('Token verification failed:', error);
        setUser(null); 
      } finally {
        setLoading(false); 
      }
    };

    verifyToken();
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await apiClient.post('/auth/login', { identifier, password });
      const { employee } = response.data;
      setUser(employee);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading, 
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;