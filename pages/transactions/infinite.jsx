import axios from "axios";
import Link from "next/link";
import { useRef, useCallback, useEffect, useContext, useState } from "react";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeContext } from "@/components/Context";
import { createTransaction } from "@/helpers/createTransaction";
import { useCreateTransactionInfinity } from "@/hooks/useCreateTransactionInfinity";
import { deleteTransaction } from "@/helpers/deleteTransaction";
import ContexMenu from "@/components/ContexMenu";

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
  // date: "Sun Apr 09 2023 16:49:02 GMT+0300 (Восточная Европа, летнее время)",
  date: "Wed Apr 05 2023 21:41:36 GMT+0300 (Восточная Европа, летнее время)",
  // date: new Date().toString(),
};

const InfinitePage = () => {
  const [credentials, setCredentials] = useState(transData);
  const timeID = useRef(null)

  const [activIdx, setActivIdx] = useState(null);

  
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);
  
  const queryClient = useQueryClient();
  // console.log("HomePage", queryClient.getQueriesData());
  
  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useInfiniteQuery({
  //     queryKey: ["pokemonList"],
  //     queryFn: ({ pageParam }) => getPokemonsList(pageParam),
  //     getNextPageParam: (lastPage) => lastPage.nextPage,
  //   });


  // const mutation = useMutation({
  //   mutationFn: createTransaction,

  //   onSuccess: (data) => {
  //     setTransactions(prev => {
  //       const newCache = prev
  //       .concat(data)
  //       .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  //       .slice(0, -1);

  //       return newCache;
  //     });
  //   },
      
  // });

  const { mutate: removeTransaction } = useMutation({
    mutationFn: deleteTransaction,

    onSuccess: async (data) => {
      const dataInfinity = queryClient.getQueriesData(["transactionsList"]);
      const allPages = dataInfinity[0][1].pages;
      const lastPageNumber = allPages.length;

      const lastPageData = await getAllTransactions(lastPageNumber);
      const lastTransaction = lastPageData.pop();

      let pageIdx = null
      let prevDataCache = lastTransaction;
      const newCacheQuery = [];
      
      for (let i = 0; i < allPages.length; i += 1) {
        const page = allPages[i];
        const removeTransaction = page.find(item => item._id === data._id);
        
        if (removeTransaction) {
          pageIdx = i;
        };  
      };

      for (let i = lastPageNumber - 1; i >= 0; i -= 1) {
        const page = allPages[i];
    
        if (i > pageIdx) {
          const newCache = page.concat(prevDataCache);

          prevDataCache = newCache.shift();
          newCacheQuery.push(newCache);
        };

        if (i === pageIdx) {
          const newCache = page
            .filter(item => item._id !== data._id)
            .concat(prevDataCache);

          newCacheQuery.push(newCache);
        }; 

        if (i < pageIdx) {
          newCacheQuery.push(page);
        };

      };
 
      queryClient.setQueryData(['transactionsList'], (prev) => {
        return{
          ...prev,
          pages: newCacheQuery.reverse(),
        }
      });


      // const PAGE_LIMIT = 5;
      // const lastPageNumber =  transactions.length / PAGE_LIMIT
      
      // setTransactions(prev => {
      //   const newCache = prev
      //   .filter(item => item._id !== data._id)
      //   .concat(lastTransaction)
        
      //   return newCache;
      // });

      // setActivIdx(null);
    },
      
  });

 
  
  
   

  // const { mutate: createTrans } = useCreateTransactionInfinity(setTransactions);

  const { mutate: createTrans }  = useMutation({
    mutationFn: createTransaction,

    onSuccess: (data) => {

      const dataInfinity = queryClient.getQueriesData(["transactionsList"]);
      const allPages = dataInfinity[0][1].pages;
      
      let newData = data;
      const newCacheQuery = [];

      for (let i = 0; i < allPages.length; i += 1) {
        const page = allPages[i];

        const newCache = [newData, ...page]
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        newData = newCache.pop();  

        newCacheQuery.push(newCache);
      };
      
      queryClient.setQueryData(['transactionsList'], (prev) => {
        return {
          ...prev,
          pages: newCacheQuery,
        }
        
      });
    }, 

  });


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["transactionsList"],
      queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        
        return lastPage.length !== 0 ? nextPage : undefined;
      },

      staleTime: Infinity,
        // staleTime: 100000,
        // cacheTime: 12000,

      select: (data) => data.pages.flat(),

      onSuccess: (data) => {
        // const currentIdx = data.pages.length - 1
        // const currentPage = data.pages[currentIdx]
        
        // setTransactions((prev) => [...prev, ...currentPage]);
        // setTransactions(data.pages.flat());
        // setTransactions(data);
      },

      
    });
      

    // console.log("data:", data);
   
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
  }, [handleObserver])


  const onCreate = async (e) => {
    e.preventDefault();
    createTrans(credentials);
  };

  const onDelete = (id) => {
    
    timeID.current = setTimeout(() => {
    removeTransaction(id);
    console.log("DELETE");
    }, 100);
  };

  const onCancelDeletion = () => {
    console.log('CANCEL');
    clearTimeout(timeID.current);
  };

  const onClose= (idx) => {
    // setActivIdx(p => p.filter(item => item !== idx));
    setActivIdx(idx);
  };

  const onOpen= (idx) => {
    setActivIdx(idx);
    // setActivIdx(p => [...p, idx]);
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

      {/* <div style={{ height: "145px", background: "aqua", overflowY: "scroll" }}>
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
      </div> */}


      <div style={{ height: "145px", background: "aqua", overflowY: "scroll" }}>
       
        {data?.map((item, idx) => {
          return (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}} key={item._id}>
            <button type="button" onClick={() => onOpen(idx)}>Open</button>

            <li style={{ height: "30px", fontSize: "20px", width: "200px" }} >
              {item.category}
            </li>

            { activIdx === idx && 
              <ContexMenu 
                activ={activIdx === idx}
                onClose={() => onClose(null)}
                onDelete={() => onDelete(item._id)}
                onCancelDeletion={() => onCancelDeletion()}
              />
            }
 
          </div>
          );
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
