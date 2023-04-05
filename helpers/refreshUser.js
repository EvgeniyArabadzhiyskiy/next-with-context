import axios from "axios";
import { parseCookies } from "nookies";
import { authHeader } from "./setToken";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const USER_CURRENT = "/users/current";

export const refreshUser = async () => {
  const { authToken } = parseCookies();

  // if (!authToken) {
  //   return
  // }

  authHeader.set(authToken);

  const { data } = await axios.get(`${BASE_URL}${USER_CURRENT}`);

  return data;
};
