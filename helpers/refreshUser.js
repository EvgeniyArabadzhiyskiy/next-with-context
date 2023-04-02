import axios from "axios";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const USER_CURRENT = "/users/current";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3OTU3NzcxMiwiZXhwIjoxNjgwNzg3MzEyfQ.VY_G-L1q8yYS7Q_c_l3Y4bsNAYG3wuAH2wrp-kXBNBY`;

export const refreshUser = async () => {
  const { data } = await axios.get(`${BASE_URL}${USER_CURRENT}`);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return data;
};
