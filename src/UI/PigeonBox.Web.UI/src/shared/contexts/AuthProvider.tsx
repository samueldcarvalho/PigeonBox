import { createContext, ReactNode, useState } from "react";
import { RegisterInputModel } from "../models/Input/RegisterInputModel";
import { IUser } from "../models/User";
import { CookiesService } from "../services/CookiesService";
import { UserService } from "../services/UserService";

interface IAuthContextProps {
  User: IUser;
  Login: (username: string, password: string) => Promise<boolean>;
  Register: (input: RegisterInputModel) => Promise<boolean>;
  GetUser: () => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  async function Login(username: string, password: string): Promise<boolean> {
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

  async function Register(input: RegisterInputModel): Promise<boolean> {
    return await UserService.SignUpAsync(input);
  }

  async function GetUser() {
    const cookie = CookiesService.GetUserTokenCookie();

    if (!cookie) return false;

    const user = await UserService.SignInAsync(cookie);

    if (!user) return false;

    setUser(user);
    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        User: user!,
        Login,
        Register,
        GetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
