import { createContext, ReactNode, useState } from "react";
import { IUser } from "../../components/ChatBoxLayout";
import { CookiesService } from "../services/CookiesService";
import { UserService } from "../services/UserService";

interface IAuthContextProps {
  User: IUser;
  SignIn: (username: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  async function SignIn(username: string, password: string): Promise<boolean> {
    const credentials = Buffer.from(
      `${username}:${password}`,
      "binary"
    ).toString("base64");

    const user = await UserService.SignInAsync(credentials);

    if (!user) return false;

    CookiesService.SetUserTokenCookie(credentials);

    setUser(user);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        User: user!,
        SignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
