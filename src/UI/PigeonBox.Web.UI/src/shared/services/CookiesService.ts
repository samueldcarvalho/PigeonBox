import { setCookie, parseCookies, destroyCookie } from "nookies";

function SetUserTokenCookie(token: string) {
  setCookie(null, "TkCredUsr", token, { maxAge: 7 * 24 * 60 * 60 });
}

function GetUserTokenCookie(): string {
  return parseCookies()["TkCredUsr"];
}

function RemoveUserTokenCookie() {
  destroyCookie(null, "TkCredUsr");
}

export const CookiesService = {
  SetUserTokenCookie,
  GetUserTokenCookie,
  RemoveUserTokenCookie,
};
