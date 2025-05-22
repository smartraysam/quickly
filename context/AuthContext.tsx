// context/AuthContext.tsx
import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
}

const AuthContext = createContext<{
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}>({
  token: null,
  user: null,
  isAuthenticated: false,
  setToken: () => {},
  setUser: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        setToken,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
