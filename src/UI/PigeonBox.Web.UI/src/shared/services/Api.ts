import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.BASEURL_API,
});
