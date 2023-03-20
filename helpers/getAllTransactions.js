import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3OTA3MjM1NCwiZXhwIjoxNjgwMjgxOTU0fQ.u1VWvbA1LAtnjGSqFXWolUmnIidmrquomyDn4H9KmUU`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getAllTransactions = async () => {
  const {data}  = await axios(
    `https://wallet-backend-xmk0.onrender.com/api/transactions?page=1&limit=5`
  );
//   console.log("getAllTransactions  data.transactions:", data);
  return data;
};
