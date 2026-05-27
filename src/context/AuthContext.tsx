import React, { useEffect, useState, createContext, useContext } from 'react';
import { api, AdminUser, clearAdminToken, setAdminToken } from '../lib/api';
interface AuthContextType {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    api.me()
      .then(({ admin }) => {
        setAdmin(admin);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setAdmin(null);
        setIsAuthenticated(false);
      })
      .finally(() => setIsLoaded(true));
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      setAdminToken(response.token);
      setAdmin(response.admin);
      setIsAuthenticated(true);
      return true;
    } catch {
      clearAdminToken();
      setAdmin(null);
      setIsAuthenticated(false);
      return false;
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    clearAdminToken();
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        admin,
        loading: !isLoaded,
        login,
        logout
      }}>
      
      {children}
    </AuthContext.Provider>);

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
