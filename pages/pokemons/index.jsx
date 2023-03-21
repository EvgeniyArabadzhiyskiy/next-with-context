import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
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
  // const [ddd, setDdd] = useState([]);
  // const [searchValue, setSearchValue] = useState("");
  // const [pageNum, setPageNum] = useState("");
  // console.log("HomePage  ddd:", ddd);

  // console.log("HomePage  pageNum:", pageNum);
  // console.log("HomePage  ddd:", ddd);

  const { ddd, isShow, setIsShow, setPageNum, searchValue, setSearchValue } =
    useContext(HomeContext);

  // const { isLoading, data } = useQuery({
  //   queryKey: ["pokemon", pageNum],
  //   queryFn: () => getAllTransactions(pageNum),
  //   enabled: pageNum.length > 0,
  // });
  // console.log("HomePage  data:", data);

  // const { data, error } = useSWR("pokeapi", () => fetchPokemon(pageNum));
  // console.log("HomePage  data:", data);

  useEffect(() => {
    console.log("Mount");

    return () => console.log("BUY BUY");
  }, []);

  // useEffect(() => {
  //   if (data) setDdd((prev) => [...prev, ...data]);
  // }, [data]);

  // const incrementCount = () => setCount((p) => p + 1);
  // const decrementCount = () => setCount((p) => p - 1);

  const onNextPage = (e) => {
    e.preventDefault();
    setPageNum(searchValue);
    // setPageNum((p) => p + 1);
  };

  const toggleVisible = () => setIsShow((p) => !p);

  const hount = () => console.log("HELLO");

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      <form onSubmit={(e) => onNextPage(e)}>
        <input
          type="text"
          onChange={({ target: { value } }) => setSearchValue(value)}
          value={searchValue}
        />

        <button type="submit">Next Page</button>
      </form>

      {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button>

      {/* <button type="button" onClick={onNextPage}>
        Next Page
      </button> */}

      {/* <h2>{data.name}</h2> */}

      {/* <ul>
        {data.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul> */}

      <ul>
        {ddd.map((item) => {
          return <li key={item._id}>{item.category}</li>;
        })}
      </ul>

      {/* <h2>{count}</h2>
      <button type="button" onClick={incrementCount}>Добавить</button>
      <button type="button" onClick={decrementCount}>Отнять</button> */}

      <button type="button" onClick={hount}>
        CLICK
      </button>
    </>
  );
};

const fetcher = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
  const data = await response.json();
  return data.name;
};

export default HomePage;

// const WrapperContext = () => (
//   <HomeProvider>
//     <HomePage />
//   </HomeProvider>
// );

// export default WrapperContext;
