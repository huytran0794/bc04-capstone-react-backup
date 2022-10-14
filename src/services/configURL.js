import axios from "axios";
import { localServ } from "./localServ";

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNCIsIkhldEhhblN0cmluZyI6IjIwLzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3Njg1MTIwMDAwMCIsIm5iZiI6MTY1NDEwMjgwMCwiZXhwIjoxNjc2OTk4ODAwfQ.QYLXMgjth5hQh9opZbNS7JEDPZGWA3o_95kR_VyLix8";

export const BASE_URL = "https://movienew.cybersoft.edu.vn";
export const maNhom = "GP02";

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + localServ.user.get()?.accessToken,
  },
});
// https.interceptors.request.use(
//   (config) => {
//     // do something before request is sent
//     store.dispatch(setIsLoading(true));
//     return config;
//   },
//   (err) => {
//     // do something with request error
//     return Promise.reject(err);
//   }
// );
// https.interceptors.response.use(
//   (res) => {
//     store.dispatch(setIsLoading(false));
//     // do something with response data
//     return res;
//   },
//   (err) => {
//     // do something with response error
//     store.dispatch(setIsLoading(false));
//     return Promise.reject(err);
//   }
// );
