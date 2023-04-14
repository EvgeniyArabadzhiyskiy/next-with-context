import axios from "axios";

const TRANSACTIONS = "/transactions";
const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3OTU3NzcxMiwiZXhwIjoxNjgwNzg3MzEyfQ.VY_G-L1q8yYS7Q_c_l3Y4bsNAYG3wuAH2wrp-kXBNBY`;
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const createTransaction = async (transaction) => {
  const {data} = await axios.post(`${BASE_URL}${TRANSACTIONS}`, transaction);
  // console.log("SecondPage  data:", data);
  return data;
};
