import { User } from "@/types/user";
import { useLocalStorage } from "ilias-use-storage";
import { createContext, useCallback, useContext } from "react";

export interface AuthContextType {
  user?: User | null;
  // isUpdated?: boolean;
  // isAuthenticated?: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage<User | undefined>(
    "user",
    undefined
  );

  const logout = useCallback(() => {
    removeUser();
  }, [removeUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
