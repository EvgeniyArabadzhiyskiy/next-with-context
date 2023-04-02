import axios from "axios";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const USER_LOGIN = "/users/login";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3OTU3NzcxMiwiZXhwIjoxNjgwNzg3MzEyfQ.VY_G-L1q8yYS7Q_c_l3Y4bsNAYG3wuAH2wrp-kXBNBY`;

export const getUser = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}${USER_LOGIN}`, credentials);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return data;
};
