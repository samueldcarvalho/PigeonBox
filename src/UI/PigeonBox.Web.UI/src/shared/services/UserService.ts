import { IUser } from "../../components/ChatBoxLayout";
import { Api } from "./Api";

async function SignInAsync(credentialToken: string): Promise<IUser | null> {
  return await Api.get("/user/get", {
    headers: { Authorization: `Basic ${credentialToken}` },
  })
    .then((res) => res.data as IUser)
    .catch(() => {
      return null;
    });
}

export const UserService = {
  SignInAsync,
};
