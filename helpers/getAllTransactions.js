import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY4MTkxOTE2OSwiZXhwIjoxNjgzMTI4NzY5fQ.fFYovuw16WC6wzaD0ZJ47DJGiRxTy9iLrcr922rZMNE`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getAllTransactions = async (pageNum = 1) => {
  const { data } = await axios(
    `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${pageNum}&limit=5`
  );

  return data.transactions;
};
