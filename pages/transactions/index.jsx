import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState, useRef } from "react";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useSWR from "swr";

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
  // const [pageNum, setPageNum] = useState(1);
   // const [transactions, setTransactions] = useState([]);
  // const [isShow, setIsShow] = useState(false);
  const { transactions, setTransactions, isShow, setIsShow, pageNum, setPageNum } = useContext(HomeContext);

  // const state = queryClient.getQueryState()
  // console.log(state)

  // const dataCacheTrans = queryClient.getQueryData(["transactions", pageNum])  //ЕСЛИ данные не собираются в один массив



  // const dataCacheTrans = queryClient
  //   .getQueriesData(["transactions"])
  //   .map(([key, data]) => data)
  //   .filter((data) => data !== undefined)
  //   .flat();

  // console.log("HomePage  dataCacheTrans:", dataCacheTrans);


  const eee = async () => {
    // setPageNum((p) => p + 1);
    // try {
    //   const data = await queryClient.fetchQuery({
    //     queryKey: ["transactions", pageNum],
    //     queryFn: () => getAllTransactions(pageNum),
    //   });
    //   // console.log("eee  data:", data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    // enabled: isSkip,
    // refetchOnWindowFocus: false,

    // keepPreviousData: true,
    // cacheTime: 0.2 * (60 * 1000),
    // staleTime: 0.2 * (60 * 1000),
    staleTime: Infinity,

    // select: (data) => data.transactions,
    // onSuccess: (data) => {
    //   setTransactions((prev) => [...prev, ...data]);
    //   // setTransactions(data);
    // },
  });


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

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>{" "}
      <Link href="/transactions/second">SECOND</Link>

      {/* {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button> */}

      <button type="button" onClick={onNextPage}>
        Next Page
      </button>{" "}
      <button type="button" onClick={eee}>
        TEST
      </button>

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
