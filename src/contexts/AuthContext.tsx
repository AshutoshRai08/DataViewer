import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Dummy login: valid credentials are demo/demo
  const login = (username: string, password: string): boolean => {
    if (username === 'demo' && password === 'demo') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
