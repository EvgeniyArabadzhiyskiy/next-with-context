import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState, useRef, useMemo, useCallback } from "react";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTransaction } from "@/helpers/createTransaction";
import { useCreateTransaction } from "@/hooks/useCreateTransaction";
import { updateCacheTransaction } from "@/helpers/updateCacheTransaction";
import { deleteTransaction } from "@/helpers/deleteTransaction";
import { getCurrentTransactions } from "@/helpers/getCurrentTransactions";

// const operationDate = 
// moment(new Date("Thu Apr 06 2023 08:42:34 GMT+0300 (Восточная Европа, летнее время)"))
// .format("YYYY-MM-DD HH:mm:ss");
  
const transData = {
  amount: 500,
  category: "WODA",
  typeOperation: "expense",
  comment: "Fruits",
  // date: "Wed Apr 05 2023 21:43:29 GMT+0300 (Восточная Европа, летнее время)",
  date: "Wed Apr 05 2023 21:41:36 GMT+0300 (Восточная Европа, летнее время)",
  // date: new Date().toString(),
};



// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   // const data = await queryClient.fetchQuery(["transactions", 1], () => getAllTransactions(1));
  
//    await queryClient.prefetchQuery(["transactions", 1], () => getAllTransactions(1));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//       // initialData: data

//     },
//   };
// }

// export async function getStaticProps() {
//   const initialData = await getAllTransactions();
//   return { props: { initialData } };
// }

const HomePage = ({dehydratedState, initialData = [] }) => {
  // console.log("HomePage  initialData:", initialData);
  // console.log("HomePage  dehydratedState:", dehydratedState.queries[0].state.data);
  const queryClient = useQueryClient();


  const [isSkip, setIsSkip] = useState(false);
  const [credentials, setCredentials] = useState(transData);
   
  // const [pageNum, setPageNum] = useState(1);
  // const [transactions, setTransactions] = useState([]);
  // const [isShow, setIsShow] = useState(false);
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);

  // const dataCacheTrans = queryClient.getQueryData(["transactions", pageNum])  //ЕСЛИ данные не собираются в один массив

  // const dataCacheTrans = queryClient      //// ЕСЛИ данные  собираются в один массив
  //   .getQueriesData(["transactions"])
  //   .map(([key, data]) => data)
  //   .filter((data) => data !== undefined)
  //   .flat()

  // console.log("dataCacheTrans:", dataCacheTrans);
  // console.log("HomePage", queryClient.getQueriesData());

 

  // const { mutate: createTrans } = useCreateTransaction()  // Custom Hook

  const { mutate: createTrans }  = useMutation({
    mutationFn: createTransaction,

    onSuccess: (data, variables) => {
      // console.log("data:", data);
      //==================== One Page Pagination =====================================
  
      // let page = null;
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

      const PAGE_LIMIT = 5;
      const page = Math.ceil(data.position/PAGE_LIMIT);
      
      
      const queryLength = queryClient.getQueriesData(["transactions"]).length;
      let newData = data;
      // console.log("newData:", newData);
      
      // console.log("Page:", page);
      // console.log("Position:", data.position);
      // console.log("Length:", queryLength);
    
    
     if (page) {
      for (let i = page; i <= queryLength; i += 1) {
        // console.log("i:", i);
        // const cachedData = queryClient.getQueryData(["transactions", i]);

        // if (cachedData) {
        //   const newCache = cachedData
        //     .concat(newData)
        //     .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        //     .slice(0, -1);
             
        //   newData = cachedData.pop();

        //   queryClient.setQueryData(["transactions", i], newCache);
        // }

        
        queryClient.setQueryData(["transactions", i], (prev) => {
          if (prev) {
            const newCache = [newData, ...prev]
              .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
              .slice(0, -1);
              

            newData = prev.pop();
              
            return newCache;
          }
        }); 

      };

      const cachedDat = queryClient.getQueriesData(["transactions"]);
      // console.log("cachedData:", cachedDat);
      
      // const cachedData = queryClient.getQueryData(["transactions", 2]);
      // console.log("cachedData:", cachedData);
     };

      //======================Infinity Scroll with Context==========================================
      // setTransactions(prev => {
      //   const newCache = prev
      //   .concat(data)
      //   .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      //   .slice(0, -1)
        
      //   return newCache
      // });

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


      //========== One Page Pagination + новые запросы==================
      // queryClient.removeQueries({ queryKey: ["transactions"] });


      //================================================================
      // setPageNum(1);
      // queryClient.removeQueries({ queryKey: ["transactions"] });
    },
  });
   

  const mutation = useMutation({
    mutationFn: deleteTransaction,

    onSuccess: async (data) => {
      // const PAGE_LIMIT = 5;
      // const lastPageNumber =  transactions.length / PAGE_LIMIT;
      
      const queryLength = queryClient.getQueriesData(["transactions"]).length;

      const lastPage = await getAllTransactions(queryLength)
      const cutOffTrans = lastPage.pop();

      setTransactions(prev => {
        const newCache = prev
        .filter(item => item._id !== data._id)
        .concat(cutOffTrans);
        
        return newCache;
      });
      //=============================================================
      // let prevDataCache = cutOffTrans
  
      // for (let i = queryLength; i > pageNum; i -= 1) {

      //   queryClient.setQueryData(['transactions', i], (prev) => {
      //     const newCache = prev
      //     .concat(prevDataCache)

      //     prevDataCache = newCache.shift()
      //     // console.log("queryClient.setQueryData  newCache:", newCache);
          
      //     return newCache
      //   })
        
      // };

      // queryClient.setQueryData(['transactions', pageNum], (prev) => {
      //   const newCache = prev
      //   .filter(item => item._id !== data._id)
      //   .concat(prevDataCache);
      //   // console.log("queryClient.setQueryData  newCache:", newCache);
      //   return newCache
      // });


    },
      
      
  });


  const { isLoading, data: todos, isPreviousData } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    // enabled: isSkip,
    // refetchOnWindowFocus: false,

    staleTime: Infinity,
    keepPreviousData: true,

    onSuccess: (data) => {
      setTransactions((prev) => [...prev, ...data]);
      // setTransactions(data);
    },
  });


  //================================================================
  const fetchQuery = async () => {

  };


  const visibleTrans = useMemo(
    () => getCurrentTransactions(pageNum, transactions),
    [pageNum, transactions]
  );


  const onDelete = (id) => {
    mutation.mutate(id)
  }

  const onNextPage = () => {
    setIsSkip(true);
    setPageNum((p) => p + 1);
  };

  // const toggleVisible = () => setIsShow((p) => !p);

  const onCreate = async (e) => {
    e.preventDefault();
    createTrans(credentials)
    // mutation.mutate(credentials);
  };

  return (
    <>
      <h1>Home Page</h1>
      <Link href="/">HOME</Link> <Link href="/transactions/infinite">SECOND</Link>
      {/* {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button> */}
      <button type="button" onClick={onNextPage}>
        Next Page
      </button>{" "}
      <button type="button" disabled={pageNum < 2} onClick={() => setPageNum((p) => p - 1)}>
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
      
      <ul>
        {todos?.map((item) => {
        {/* {transactions?.map((item) => { */}
          return (
          <div style={{display: 'flex', justifyContent: 'space-between', width: '200px'}} key={item._id}>
            <li>{item.category}</li>
            <button  type="button" onClick={() => onDelete(item._id)}> Delete</button>
          </div>)
        })}
      </ul>

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

//============================================================
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

 //================================================================
  // const firstRender = useRef(true);
  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   if (data) setTransactions((prev) => [...prev, ...data]);
  // }, [data, setTransactions]);

  //============================================================
  // const cache = queryClient.getQueryCache().add({
  //   queryKey: ["transactions"],
  //   state: {
  //     data: [data],
  //   },
  // });

  //============================================================
  // useEffect(() => {
  //   if (!isPreviousData && todos) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["transactions", pageNum + 1],
  //       queryFn: () => getAllTransactions(pageNum + 1),
  //     })
  //   }
  // }, [isPreviousData, pageNum, queryClient, todos])




//================================BIG O Log==============================
// const transaction = 67;
// // const allTransactions = [1, 2, 3, 67, 4, 5, 12, 41, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 214, 85];
// const numbersString = [1, 2, 3, 67, 4, 5, 41, 6, 7, 8, 9, 6, 10, 11, 12,5, 6, 13, 14, 15, 214, 1, 85].map(i => i.toString())
// console.log("numbers:", numbers);
// const sortNum = numbers.sort((a, b) => a - b); 
// // console.log("sortNum:", sortNum);

// function binarySearch(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     // console.log("binarySearch  mid:", mid);
    
//     const cmp = target.toString().localeCompare(arr[mid].toString());
//     // console.log("binarySearch  cmp:", cmp);

//     if (cmp === 0) {
//       return mid;
//     } else if (cmp < 0) {
//       right = mid - 1;
//     } else {
//       left = mid + 1;
//     }
//   }

//   return -1;
// }

// const indexNewTransaction = binarySearch(sortNum, transaction);
// console.log("indexNewTransaction:", indexNewTransaction);




// console.log(  star);










function binarySearch(array, targetValue) {
  const arr = array.slice().sort();
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cmp = targetValue.localeCompare(arr[mid]);

    if (cmp === 0) {
      // Если значение найдено, необходимо найти его индекс в исходном массиве
      const index = array.findIndex((value) => value === arr[mid]);
      return index;
    } else if (cmp < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

const targetValue = '41';
const numbersString = ['1', '2', '3', '4', '214', '5', '6', '6', '7', '8', '9', '10','1', '11', '12', '13', '14', '15','7', '41', '67', '85', '214'].sort((a,b) => a-b);





// const index = binarySearch(numbersString, targetValue);

// if (index === -1) {
//   console.log(`Значение ${targetValue} не найдено в массиве`);
// } else {
//   console.log(`Значение ${targetValue} найдено в массиве, индекс: ${index}`);
// }




