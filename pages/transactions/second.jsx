import { HomeContext } from "@/components/Context";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
// import { useContext } from "react";

const SecondPage = () => {
  const queryClient = useQueryClient();

  // const cacheTransactions = queryClient  //// ЕСЛИ данные  собираются в один массив
  //   .getQueryCache()
  //   .findAll(["transactions"])
  //   .map((item) => item.state.data)
  //   .flat();
  // console.log("SecondPage  cacheTransactions:", cacheTransactions);
  


  // const dataCacheTrans = queryClient    //ЕСЛИ данные не собираются в один массив
  // .getQueryCache()
  // .find(["transactions", pageNum])
  // ?.state.data

  // const { count, setCount } = useContext(HomeContext);

  // const incrementCount = () => setCount((p) => p + 1);
  // const decrementCount = () => setCount((p) => p - 1);

  return (
    <>
      <h1>Home Page</h1>
      {/* <h2>{count}</h2> */}

      <Link href="/">HOME</Link>
      <Link href="/transactions">Transactions</Link>

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
