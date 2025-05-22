import { User } from "@/hooks/useCurrentUser";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext<{
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}>({
  token: null,
  user: null,
  isAuthenticated: false,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenState, setTokenState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("auth-token");
    }
    return null;
  });

  const [user, setUser] = useState<User | null>(null);

  const setToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem("auth-token", token);
    } else {
      sessionStorage.removeItem("auth-token");
    }
    setTokenState(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: tokenState,
        user,
        isAuthenticated: !!tokenState,
        setToken,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
