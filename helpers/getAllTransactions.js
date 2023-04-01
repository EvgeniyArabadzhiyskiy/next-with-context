import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3OTU3NzcxMiwiZXhwIjoxNjgwNzg3MzEyfQ.VY_G-L1q8yYS7Q_c_l3Y4bsNAYG3wuAH2wrp-kXBNBY`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getAllTransactions = async (pageNum = 1) => {
  const { data } = await axios(
    `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${pageNum}&limit=5`
  );

  return data.transactions;
};
