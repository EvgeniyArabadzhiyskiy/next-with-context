import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY4MDcwNTM0NCwiZXhwIjoxNjgxOTE0OTQ0fQ.7ZeYJofwN1YSSCb_MyE7t8NTW8srhYNdCLw1ITqyKTg`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getAllTransactions = async (pageNum = 1) => {
  const { data } = await axios(
    `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${pageNum}&limit=5`
  );

  return data.transactions;
};
