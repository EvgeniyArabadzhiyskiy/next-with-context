import axios from "axios";
import Link from "next/link";
import { useRef, useCallback, useEffect, useContext, useState } from "react";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeContext } from "@/components/Context";
import { createTransaction } from "@/helpers/createTransaction";

const getPokemonsList = async (
  page = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
) => {
  const { data: { results, next } = {} } = await axios(page);
  return { response: results, nextPage: next };
};


const transData = {
  amount: 500,
  category: "WODA",
  typeOperation: "expense",
  comment: "Fruits",
  date: "Wed Apr 05 2023 22:43:44 GMT+0300 (Восточная Европа, летнее время)",
  // date: new Date().toString(),
};

const InfinitePage = () => {
  const queryClient = useQueryClient();
  const [credentials, setCredentials] = useState(transData);
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);
  // console.log("InfinitePage  transactions:", transactions);
  
  
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["pokemonList"],
  //     queryFn: ({ pageParam }) => getPokemonsList(pageParam),
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //   });


  const mutation = useMutation({
    mutationFn: createTransaction,

    onSuccess: (data, variables) => {
      //==================== One Page Pagination =====================================

      // let page = null;
      // const PAGE_LIMIT = 5;

      // dataCacheTrans.reduce((acc,item) => {
      //   const isOlder = Date.parse(item.date) > Date.parse(data.date)

      //   if (isOlder) {
      //     acc += 1;
      //   }
    
      //   if (!isOlder) {
      //     page = Math.ceil(acc/PAGE_LIMIT);
      //   }
      //   return acc;
        
      // },1);
      
      // const dataLength = queryClient.getQueriesData(["transactions"]).length;
      // let newData = data;
    
    //  if (page) {
    //   for (let i = page; i <= dataLength; i += 1) {
    //     // console.log("hello", i);
    //     queryClient.setQueryData(['transactions', i], (prev) => {
    //       const newCache  = prev
    //       .concat(newData)
    //       .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    //       .slice(0, -1);
          
    //       newData = prev.pop();

    //       return newCache;
    //     }) 
    //   };
    //  }

      //======================Infinity Scroll with Context==========================================
      setTransactions(prev => {
        // console.log("InfinitePage  prev:", prev);
        // const newCache = prev
        // .concat(data)
        // .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        // .slice(0, -1)
        // console.log("InfinitePage  newCache:", newCache);
        // return newCache
      });

      //========================Infinity Scroll with Cache========================================
      // for (let i = 1; i < pageNum; i += 1) {
      //   console.log("hello", i);
      //   queryClient.setQueryData(['transactions', i], []) 
      // }

      // queryClient.setQueryData(['transactions', pageNum], () => {
      //   const newCache = dataCacheTrans
      //   .concat(data)
      //   .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      //   .slice(0, -1)
      //   return newCache
      // })

    
    },
      
  });


  // console.log("HomePage", queryClient.getQueriesData(["transactionsList"]));

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["transactionsList"],
    queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      // console.log("InfinitePage  nextPage:", nextPage);
      
      return lastPage.length !== 0 ? nextPage : undefined;
    },

    staleTime: Infinity,
      // staleTime: 100000,
      // cacheTime: 12000,

    onSuccess: (data) => {
        console.log("InfinitePage  data:", data.pages.flat());
      // setTransactions(data.pages.flat());
        setTransactions(data);
    },
  });

    // console.log("InfinitePage  data:", data);
    
  const observerElem = useRef(null);  
 
  const handleObserver = useCallback((entries) => {
    // console.log("handleObserver  hasNextPage:", hasNextPage);
    // console.log("handleObserver  entries[0].isIntersecting:", entries[0].isIntersecting);
    if(entries[0].isIntersecting && hasNextPage) {
      // console.log("next Page");
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  useEffect(() => {
    const target = observerElem.current
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(target)

    return () => observer.unobserve(target)
  }, [handleObserver])


  const onCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/transactions">Transactions</Link>

      <form onSubmit={onCreate}>
        <input type="number" name="amount" placeholder="Amount" />
        <input type="text" name="category" placeholder="Category" />
        <button type="submit">Login</button>
      </form>

      <div style={{ height: "145px", background: "aqua", overflowY: "scroll" }}>
        {transactions?.pages.map((group) => {
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


      {/* <div style={{ height: "145px", background: "aqua", overflowY: "scroll" }}>
       
        {transactions?.map((item) => {
          return (
            <li style={{ height: "30px", fontSize: "20px" }} key={item._id}>
              {item.category}
            </li>
          );
        })}

        <div ref={observerElem} style={{ height: "50px", background: "tomato" }}>
          {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
        </div>
        
      </div> */}

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
