import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";
import { RegisterInputModel } from "../models/Input/RegisterInputModel";
import { IUser } from "../models/User";
import { CookiesService } from "../services/CookiesService";
import { UserService } from "../services/UserService";
import { ChatContext, ChatProvider } from "./ChatProvider";
import { ChatService } from "../services/ChatService";

interface IAuthContextProps {
  User: IUser;
  Login: (username: string, password: string) => Promise<boolean>;
  Logout: () => void;
  Register: (input: RegisterInputModel) => Promise<boolean>;
  GetUser: () => Promise<boolean>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const Router = useRouter();

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

    if (!cookie) {
      return false;
    }

    const user = await UserService.SignInAsync(cookie);

    if (!user) {
      CookiesService.RemoveUserTokenCookie();
      setUser(null);
      return false;
    }

    setUser(user);
    return true;
  }

  async function Logout() {
    setUser(null);
    
    if(ChatService.connection != null)
      await ChatService.connection.stop();

    CookiesService.RemoveUserTokenCookie();
    Router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        User: user!,
        Login,
        Register,
        GetUser,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
