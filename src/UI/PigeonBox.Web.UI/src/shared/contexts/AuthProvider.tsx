import { createContext, ReactNode, useState } from "react";
import { UserService } from "../services/UserService";

interface IAuthContextProps {
  IsAuthenticated: boolean;
  SignIn: (username: string, password: string) => void;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  async function SignIn(username: string, password: string) {
    const user = await UserService.SignInAsync(username, password);

    console.log(user);
  }

  return (
    <AuthContext.Provider
      value={{
        IsAuthenticated: isAuthenticated,
        SignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
