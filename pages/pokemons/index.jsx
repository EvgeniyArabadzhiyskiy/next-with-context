import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { count, setCount, isShow, setIsShow } = useContext(HomeContext);

  // const { isLoading, data } = useQuery("pokemon", () =>
  //   fetchPokemon("bulbasaur")
  // );
  const { isLoading, data } = useQuery({ queryKey: ['pokemon'], queryFn: () => fetchPokemon("bulbasaur") });
  console.log("HomePage  data:", data);

  // const { isLoading, data } = useQuery("transactions", () =>
  // getAllTransactions()
  // );
  // console.log("HomePage  data:", data);

  // const incrementCount = () => setCount((p) => p + 1);
  // const decrementCount = () => setCount((p) => p - 1);

  const toggleVisible = () => setIsShow((p) => !p);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button>

      {/* <h2>{data.name}</h2> */}

      {/* <ul>
        {data.results.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul> */}

      {/* <h2>{count}</h2>
      <button type="button" onClick={incrementCount}>Добавить</button>
      <button type="button" onClick={decrementCount}>Отнять</button> */}
    </>
  );
};

export default HomePage;

// const WrapperContext = () => (
//   <HomeProvider>
//     <HomePage />
//   </HomeProvider>
// );

// export default WrapperContext;
