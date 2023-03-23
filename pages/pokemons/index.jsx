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
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(['pokemon'], fetchPokemon)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

// export async function getStaticProps() {
//   const posts = await fetchPokemon()
//   console.log("getStaticProps  posts:", posts);
//   return { props: { posts } }
// }

const HomePage = ({ posts }) => {
  // const [isShow, setIsShow] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const firstRender = useRef(true);

  // const { pokemon, isShow, setIsShow, setPageNum } = useContext(HomeContext);

  const queryClient = useQueryClient()
  // console.log("HomePage  queryClient:", queryClient.setQueriesData);

  const { isLoading, data } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (data) setPokemon((prev) => [...prev, ...data]);
  }, [data]);

  const onNextPage = (e) => {
    setPageNum((p) => p + 1);
    // queryClient.setQueryData({queryKey:'transactions'}, oldData => {
    // console.log("onNextPage  oldData:", oldData);
    // const updateData = [...oldData, ...data]

    // return updateData
    // })
  };

  // const toggleVisible = () => setIsShow((p) => !p);

  // const hount = () => console.log("HELLO");

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      {/* {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button> */}

      <button type="button" onClick={onNextPage}>
        Next Page
      </button>

      {/* <h2>{data.name}</h2> */}

      {/* <ul>
        {data.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul> */}

      <ul>
        {pokemon?.map((item) => {
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
// (async () => {
//   const data = await getAllTransactions(pageNum)
//   setPokemon((prev) => [...prev, ...data]);
// })()

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
