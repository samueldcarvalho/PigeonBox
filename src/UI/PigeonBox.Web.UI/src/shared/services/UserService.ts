import { Api } from "./Api";

async function SignInAsync(username: string, password: string) {
  const base64Credentials = Buffer.from(
    `${username}:${password}`,
    "binary"
  ).toString("base64");

  return await Api.get("/users/get", {
    headers: { Authorization: `Basic ${base64Credentials}` },
  }).then();
}

export const UserService = {
  SignInAsync,
};
