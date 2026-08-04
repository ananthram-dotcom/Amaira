import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, token: string, user: User) => void;
  signup: (name: string, email: string, token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('amaira_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('amaira_token') || null;
  });

  useEffect(() => {
    if (token && !user) {
      // Fetch user profile from API if token exists
      fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
            localStorage.setItem('amaira_user', JSON.stringify(data.user));
          } else {
            logout();
          }
        })
        .catch(() => {
          // If backend isn't reachable yet, keep existing stored user
        });
    }
  }, [token]);

  const login = (email: string, newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('amaira_token', newToken);
    localStorage.setItem('amaira_user', JSON.stringify(userData));
  };

  const signup = (name: string, email: string, newToken: string, userData: User) => {
    login(email, newToken, userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('amaira_token');
    localStorage.removeItem('amaira_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
