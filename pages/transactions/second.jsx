import { HomeContext } from "@/components/Context";
import { createTransaction } from "@/helpers/createTransaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
// import { useContext } from "react";

// const transData = {
//   amount: 500,
//   category: "Regular Income",
//   typeOperation: "income",
//   comment: "Fruits",
//   date: new Date().toString(),
// };

const SecondPage = () => {
  const queryClient = useQueryClient();

  // const [credentials, setCredentials] = useState(transData);
  // const mutation = useMutation({ mutationFn: createTransaction });

  // const cache = queryClient.getQueryCache().clear()

  // const cacheTransactions = queryClient  //// ЕСЛИ данные  собираются в один массив
  //   .getQueryCache()
  //   .findAll(["transactions"])
  //   .map((item) => item.state?.data)
  //   .filter((data) => data !== undefined)
  //   .flat();
  // console.log("SecondPage  cacheTransactions:", cacheTransactions);

  // const dataCacheTrans = queryClient    //ЕСЛИ данные не собираются в один массив
  // .getQueryCache()
  // .find(["transactions", pageNum])
  // ?.state.data

  const { count, setCount } = useContext(HomeContext);

  const incrementCount = () => setCount((p) => p + 1);
  const decrementCount = () => setCount((p) => p - 1);

  const onCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <>
      <h1>Home Page</h1>
      {/* <h2>{count}</h2> */}

      <Link href="/">HOME</Link>
      <Link href="/transactions">Transactions</Link>

      {/* <form onSubmit={onCreate}>
        <input type="number" name="amount" placeholder="Amount" />
        <input type="text" name="category" placeholder="Category" />
        <button type="submit">Login</button>
      </form> */}

      {/* <ul>
        {cacheTransactions?.map((item) => {
          return <li key={item._id}>{item.category}</li>;
        })}
      </ul> */}

      {/* <button type="button" onClick={incrementCount}>
        Добавить
      </button>

      <button type="button" onClick={decrementCount}>
        Отнять
      </button> */}
    </>
  );
};

export default SecondPage;

// useEffect(() => {
//   const getTransactions = async () => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
//     const data = await response.json();
//     console.log("getTransactions  data:", data);
//   };
//   getTransactions();
// }, []);
