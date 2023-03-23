import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";

// const getPokemonsList = async ({
//   pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10",
// }) => {
//   const { data: { results, next } = {} } = await axios(pageParam);
//   return { response: results, nextPage: next };
// };

const InfinitePage = () => {
  //   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //     useInfiniteQuery({
  //       queryKey: ["pokemonList"],
  //       queryFn: getPokemonsList,
  //       getNextPageParam: (lastPage) => lastPage.nextPage,
  //     });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pokemonList"],
      queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPagas) => allPagas.length + 1,
    });

  const [transactions] = data?.pages || [];

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      {transactions.map((group) => {
        return group.map((item) => {
          return <li key={item._id}>{item.category}</li>;
        });
      })}

      {/* {data?.pages.map((group) => {
        return group.response.map((pokemon) => {
          return <li key={pokemon.name}>{pokemon.name}</li>;
        });
      })} */}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </>
  );
};

export default InfinitePage;
