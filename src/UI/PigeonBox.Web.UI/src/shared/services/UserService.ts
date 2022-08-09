import { RegisterInputModel } from "../models/Input/RegisterInputModel";
import { IUser } from "../models/User";
import { Api } from "./Api";

async function SignUpAsync(input: RegisterInputModel): Promise<boolean> {
  return await Api.post("/user/register", input)
    .then((d) => (d.status <= 299 && d.status >= 200 ? true : false))
    .catch(() => false);
}

async function SignInAsync(credentialToken: string): Promise<IUser | null> {
  return await Api.get("/user/get", {
    headers: { Authorization: `Basic ${credentialToken}` },
  })
    .then((res) => {
      Api.defaults.headers.common["Authorization"] = `Basic ${credentialToken}`;
      return res.data as IUser;
    })
    .catch(() => {
      return null;
    });
}

export const UserService = {
  SignInAsync,
  SignUpAsync,
};
