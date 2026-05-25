import React, { useEffect, useState, createContext, useContext } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem('store_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoaded(true);
  }, []);
  const login = (password: string) => {
    // Simple hardcoded auth for demo purposes
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('store_admin_auth', 'true');
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('store_admin_auth');
  };
  if (!isLoaded) return null;
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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