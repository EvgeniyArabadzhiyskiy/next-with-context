import axios from "axios";
import Link from "next/link";
import { useRef, useCallback, useEffect, useContext, useState } from "react";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { dehydrate, QueryClient, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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





// export async function getServerSideProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchInfiniteQuery({
//     queryKey: ["transactionsList"],
//     queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
//   });

//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// }

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  const firstPageData = await getAllTransactions(1)

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["transactionsList"],
    queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
    
    initialData: {
      pages: [{ data: firstPageData }],
      pageParams: [1],
    }
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}



// export default function TodoList() {
//   const { data, fetchNextPage, hasNextPage,  } =
//     useInfiniteQuery({
//       queryKey: ["transactionsList"],
//       queryFn: ({ pageParam = 1 }) => getAllTransactions(pageParam),
//       getNextPageParam: (lastPage, allPages) => {
//         const nextPage = allPages.length + 1;
        
//         return lastPage.length !== 0 ? nextPage : undefined;
//       },

//       staleTime: Infinity,
  
//     });
//   return (
//     <div>
//       {data.map((todo) => (
//         <TodoItem key={todo.id} todo={todo} />
//       ))}
//     </div>
//   );
// }


const InfinitePage = () => {
  const timeID = useRef(null)
  const queryClient = useQueryClient();

  const [activIdx, setActivIdx] = useState([]);
  const [credentials, setCredentials] = useState(transData);

  
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);
  
  
  
  const { mutate: removeTransaction } = useMutation({
    mutationFn: deleteTransaction,

    onSuccess: async (data) => {
      const { pages } = queryClient.getQueryData(['transactionsList']);
      const lastPageNumber = pages.length;
      
      const lastPageData = await getAllTransactions(lastPageNumber);
      const lastTransaction = lastPageData.pop();
      
      const updatedPages = pages.map((page) =>
        page.filter(item => item._id !== data._id)
      );
      
      const lastPagesIdx = updatedPages.length - 1
      updatedPages[lastPagesIdx].push(lastTransaction);

 
      queryClient.setQueryData(['transactionsList'], (prev) => {
        return {
          ...prev,
          pages: updatedPages,
        }
      });
    },
      
  });

  // const { mutate: createTrans } = useCreateTransactionInfinity(setTransactions);

  const { mutate: createTrans }  = useMutation({
    mutationFn: createTransaction,

    onSuccess: (data) => {
      let newData = data;
      
      queryClient.setQueryData(['transactionsList'], (prev) => {

        const updatedPages = prev.pages.map((page) => {
          const newCache = [newData, ...page]
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

          newData = newCache.pop();
          return newCache
        });

        
        return {
          ...prev,
          pages: updatedPages,
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

      select: (data) =>  data.pages.flat(),
      
      onSuccess: (data) => {
        // console.log("data:", data);
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

  const onClose= (id) => {
    setActivIdx(p => p.filter(item => item !== id));
    // setActivIdx(id);
  };

  const onOpen= (id) => {
    setActivIdx(p => [...p, id]);
    // setActivIdx(id);
  };

  const visibleMenu = (id) => {
    return activIdx.includes(id);
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
       
        {data?.map((item) => {
          return (
            <div style={{display: 'flex', justifyContent: 'space-between', width: '400px'}} key={item._id}>
              <button type="button" onClick={() => onOpen(item._id)}>Open</button>

              <li style={{ height: "30px", fontSize: "20px", width: "200px" }} >
                {item.category}
              </li>

              {visibleMenu(item._id) && (
                <ContexMenu
                  activ={activIdx === item._id}
                  onClose={() => onClose(item._id)}
                  onDelete={() => onDelete(item._id)}
                  onCancelDeletion={() => onCancelDeletion()}
                />
              )}
            </div>
          );
        })}

        <div ref={observerElem} style={{ height: "50px", background: "tomato" }}>
          {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
        </div> 
      </div>

     
    </>
  );
};

export default InfinitePage;


//================DELETE=============================
// const { pages } = queryClient.getQueryData(['transactionsList']);
// const lastPageNumber = pages.length;

// const lastPageData = await getAllTransactions(lastPageNumber);
// const lastTransaction = lastPageData.pop();

// const updatedPages = pages.map((page) =>
//   page.filter(item => item._id !== data._id)
// );

// const lastPagesIdx = updatedPages.length - 1
// updatedPages[lastPagesIdx].push(lastTransaction);

// let pageIdx = null
// let prevDataCache = lastTransaction;
// const newCacheQuery = [];

// for (let i = 0; i < pages.length; i += 1) {
//   const page = pages[i];
//   const removeTransaction = page.find(item => item._id === data._id);
  
//   if (removeTransaction) {
//     pageIdx = i;
//   };  
// };

// for (let i = lastPageNumber - 1; i >= 0; i -= 1) {
//   const page = pages[i];

//   if (i > pageIdx) {
//     const newCache = page.concat(prevDataCache);

//     prevDataCache = newCache.shift();
//     newCacheQuery.push(newCache);
//   };

//   if (i === pageIdx) {
//     const newCache = page
//       .filter(item => item._id !== data._id)
//       .concat(prevDataCache);

//     newCacheQuery.push(newCache);
//   }; 

//   if (i < pageIdx) {
//     newCacheQuery.push(page);
//   };

// };

// queryClient.setQueryData(['transactionsList'], (prev) => {
//   return{
//     ...prev,
    
//     pages: newCacheQuery.reverse(),
//   }
// });

//================DELETE=============================
// const PAGE_LIMIT = 5;
// const lastPageNumber =  transactions.length / PAGE_LIMIT

// setTransactions(prev => {
//   const newCache = prev
//   .filter(item => item._id !== data._id)
//   .concat(lastTransaction)
  
//   return newCache;
// });

//================DELETE=============================
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

//=================CREATE================================

// const { pages } = queryClient.getQueryData(['transactionsList']);
// console.log("InfinitePage  pages:", pages);

// let newData = data;
// const newCacheQuery = [];

// for (let i = 0; i < pages.length; i += 1) {
//   const page = pages[i];

//   const newCache = [newData, ...page]
//     .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

//   newData = newCache.pop();  

//   newCacheQuery.push(newCache);
// };

// queryClient.setQueryData(['transactionsList'], (prev) => {
//   return {
//     ...prev,
//     pages: newCacheQuery,
//   }
  
// });

//==========================POKEMONS=============================

// const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
//   useInfiniteQuery({
//     queryKey: ["pokemonList"],
//     queryFn: ({ pageParam }) => getPokemonsList(pageParam),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//   });


// {data?.pages.map((group) => {
//   return group.response.map((pokemon) => {
//     return <li key={pokemon.name}>{pokemon.name}</li>;
//   });
// })}

// <button
//   onClick={() => fetchNextPage()}
//   disabled={!hasNextPage || isFetchingNextPage}
// >
//   {isFetchingNextPage
//     ? "Loading more..."
//     : hasNextPage
//     ? "Load More"
//     : "Nothing more to load"}
// </button>