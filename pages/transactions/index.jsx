import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState, useRef } from "react";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useSWR from "swr";
import { createTransaction } from "@/helpers/createTransaction";

const transData = {
  amount: 500,
  category: "WODA",
  typeOperation: "expense",
  comment: "Fruits",
  date: new Date().toString(),
};

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["transactions"], () => getAllTransactions(1));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),

//     },
//   };
// }

// export async function getStaticProps() {
//   const initialData = await getAllTransactions();
//   return { props: { initialData } };
// }

const HomePage = ({ initialData = [] }) => {
  const queryClient = useQueryClient();

  const [isSkip, setIsSkip] = useState(false);
  const [credentials, setCredentials] = useState(transData);
  // const [pageNum, setPageNum] = useState(1);
  // const [transactions, setTransactions] = useState([]);
  // const [isShow, setIsShow] = useState(false);
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);

  let dataCacheTrans = queryClient
    .getQueriesData(["transactions"])
    .map(([key, data]) => data)
    .filter((data) => data !== undefined)
    .flat();

  // console.log("dataCacheTrans:", dataCacheTrans);

  // const dataCacheTrans = queryClient.getQueryData(["transactions", pageNum])  //ЕСЛИ данные не собираются в один массив
  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data, variables) => {
      // queryClient.setQueryData(['transactions',1], (old) => {
      //   return [data.data, ...old]
      // })

      setPageNum(1);
      queryClient.removeQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  console.log("HomePage", queryClient.getQueriesData());

  const { isLoading } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    // enabled: isSkip,
    // refetchOnWindowFocus: false,

    // keepPreviousData: true,
    // cacheTime: 0.3 * (60 * 1000),
    // staleTime: 0.2 * (60 * 1000),
    staleTime: Infinity,

    // select: (data) => data.transactions,

    // onSuccess: (data) => {
    //   setTransactions((prev) => [...prev, ...data]);
    //   // setTransactions(data);
    // },
  });

  //================================================================
  // const fetchQuery = async () => {
  //   setPageNum((p) => p + 1);

  //   const data = await queryClient.fetchQuery({
  //     queryKey: ["transactions", pageNum],
  //     queryFn: () => getAllTransactions(pageNum),
  //   });

  //   setTransactions((prev) => [...prev, ...data]);
  // };

  //================================================================
  const fetchQuery = async () => {
    // queryClient.removeQueries({ queryKey:['transactions'] })
    // setPageNum((p) => p + 1);
    // const data = await queryClient.ensureQueryData({
    //   queryKey: ["transactions", pageNum],
    //   queryFn: () => getAllTransactions(pageNum),
    // });
    // console.log("fetchQuery  data:", data);
    // setTransactions((prev) => [...prev, ...data]);
  };

  //================================================================
  // const firstRender = useRef(true);
  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   if (data) setTransactions((prev) => [...prev, ...data]);
  // }, [data, setTransactions]);

  const onNextPage = (e) => {
    setIsSkip(true);
    setPageNum((p) => p + 1);
  };

  // const toggleVisible = () => setIsShow((p) => !p);

  // const hount = () => console.log("HELLO");

  // if (isLoading) {
  //   return <h1>Loading...</h1>
  // }

  const onCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <>
      <h1>Home Page</h1>
      <Link href="/">HOME</Link> <Link href="/transactions/second">SECOND</Link>
      {/* {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button> */}
      <button type="button" onClick={onNextPage}>
        Next Page
      </button>{" "}
      <button type="button" onClick={() => setPageNum((p) => p - 1)}>
        PREV Page
      </button>{" "}
      <button type="button" onClick={fetchQuery}>
        TEST
      </button>
      <form onSubmit={onCreate}>
        <input type="number" name="amount" placeholder="Amount" />
        <input type="text" name="category" placeholder="Category" />
        <button type="submit">Login</button>
      </form>
      {/* <h2>{data.name}</h2> */}
      {/* <ul>
        {data.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul> */}
      <ul>
        {dataCacheTrans?.map((item) => {
          return <li key={item._id}>{item.category}</li>;
        })}
      </ul>
      {/* <button type="button" onClick={hount}>
        CLICK
      </button> */}
    </>
  );
};

export default HomePage;
//============================================================
// const fetcher = async () => {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
//   const data = await response.json();
//   return data.name;
// };

// const WrapperContext = () => (
//   <HomeProvider>
//     <HomePage />
//   </HomeProvider>
// );

// export default WrapperContext;

//============================================================
// useEffect(() => {
//   if (data) {
//     setPokemon((prev) => [...prev, ...data]);
//   }
// }, [data]);

// useEffect(() => {
//   return () =>  setPokemon([]);
// }, []);

//============================================================
{
  /* <form onSubmit={(e) => onNextPage(e)}>
  <input
    type="text"
    onChange={({ target: { value } }) => setSearchValue(value)}
    value={searchValue}
  />

  <button type="submit">Next Page</button>
</form>; */
}
