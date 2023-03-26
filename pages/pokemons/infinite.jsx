import axios from "axios";
import Link from "next/link";
import { useRef, useCallback, useEffect } from "react";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useInfiniteQuery } from "@tanstack/react-query";

const getPokemonsList = async (
  page = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
) => {
  const { data: { results, next } = {} } = await axios(page);
  return { response: results, nextPage: next };
};

const InfinitePage = () => {
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["pokemonList"],
  //     queryFn: ({ pageParam }) => getPokemonsList(pageParam),
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //   });

  

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["transactionsList"],
      queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPagas) => {
        const nextPage = allPagas.length + 1;
        return lastPage.length !== 0 ? nextPage : undefined;
      },
    });


  const observerElem = useRef(null);  
 
  const handleObserver = useCallback((entries) => {
    if(entries[0].isIntersecting && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    const target = observerElem.current
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(target)

    return () => observer.unobserve(target)
  }, [fetchNextPage, handleObserver])

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      <div style={{ height: "145px", background: "aqua", overflowY: "scroll" }}>
        {data?.pages.map((group) => {
          return group.map((item) => {
            return (
              <li style={{ height: "30px", fontSize: "20px" }} key={item._id}>
                {item.category}
              </li>
            );
          });
        })}

        <div ref={observerElem} style={{ height: "50px", background: "tomato" }}>
          {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
        </div>
        
      </div>

      {/* {data?.pages.map((group) => {
        return group.response.map((pokemon) => {
          return <li key={pokemon.name}>{pokemon.name}</li>;
        });
      })} */}

      {/* <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button> */}
    </>
  );
};

export default InfinitePage;
