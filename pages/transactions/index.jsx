import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState, useRef } from "react";
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createTransaction } from "@/helpers/createTransaction";

// const operationDate = 
// moment(new Date("Thu Apr 06 2023 08:42:34 GMT+0300 (Восточная Европа, летнее время)"))
// .format("YYYY-MM-DD HH:mm:ss");
  
const transData = {
  amount: 500,
  category: "WODA",
  typeOperation: "expense",
  comment: "Fruits",
  date: "Wed Apr 05 2023 21:40:45 GMT+0300 (Восточная Европа, летнее время)",
  // date: new Date().toString(),
};



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
  const [credentials, setCredentials] = useState(transData);
  // const [pageNum, setPageNum] = useState(1);
  // const [transactions, setTransactions] = useState([]);
  // const [isShow, setIsShow] = useState(false);
  const { transactions, setTransactions, pageNum, setPageNum } = useContext(HomeContext);


  const dataCacheTrans = queryClient      //// ЕСЛИ данные  собираются в один массив
    .getQueriesData(["transactions"])
    .map(([key, data]) => data)
    .filter((data) => data !== undefined)
    .flat()

  // console.log("dataCacheTrans:", dataCacheTrans);
  // console.log("HomePage", queryClient.getQueriesData());

  
  // const ooo = Math.ceil(rrr/5)
  // console.log("HomePage  ooo:", ooo);


  // const dataCacheTrans = queryClient.getQueryData(["transactions", pageNum])  //ЕСЛИ данные не собираются в один массив
  
  // let page = null;
  //     const PAGE_LIMIT = 5;

  //   const rrr =  dataCacheTrans.reduce((acc,item) => {
        
  //     if (Date.parse(item.date) > Date.parse(transData.date)) {
  //       acc += 1;
  //     }
      
  //     if (!(Date.parse(item.date) > Date.parse(transData.date))) {
  //         console.log("dataCacheTrans.reduce  acc:", acc);
  //         page = Math.ceil(acc/PAGE_LIMIT);
  //       }
  //       return acc;
        
  //     },1);
  //     // console.log("rrr  rrr:", rrr);
      
  //     console.log("dataCacheTrans.reduce  page:", page);


  // const ggg = dataCacheTrans.map(item => {
  //   const isOlder = Date.parse(item.date) > Date.parse(transData.date)

  //   if (isOlder) {
  //     return true
  //   }
  //   return false
  // }).indexOf(false)
  // console.log("ggg  ggg:", Math.ceil((ggg + 1 )/5));
  

  const mutation = useMutation({
    mutationFn: createTransaction,

    onSuccess: (data, variables) => {
      //==================== One Page Pagination =====================================

      let page = null;
      const PAGE_LIMIT = 5;

      dataCacheTrans.reduce((acc,item) => {
        const isOlder = Date.parse(item.date) > Date.parse(data.date)

        if (isOlder) {
          acc += 1;
        }
    
        if (!isOlder) {
          page = Math.ceil(acc/PAGE_LIMIT);
        }
        return acc;
        
      },1);
      
      const dataLength = queryClient.getQueriesData(["transactions"]).length;
      let newData = data;
    
     if (page) {
      for (let i = page; i <= dataLength; i += 1) {
        // console.log("hello", i);
        queryClient.setQueryData(['transactions', i], (prev) => {
          const newCache  = prev
          .concat(newData)
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          .slice(0, -1);
          
          newData = prev.pop();

          return newCache;
        }) 
      };
     }

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


  const { isLoading, data: todos } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    // enabled: isSkip,
    // refetchOnWindowFocus: false,

    staleTime: Infinity,

    onSuccess: (todos) => {
      setTransactions((prev) => [...prev, ...todos]);
      // setTransactions(data);
    },
  });
 

  //================================================================
  const fetchQuery = async () => {
    
  };

  const onNextPage = () => {
    setIsSkip(true);
    setPageNum((p) => p + 1);
  };

  // const toggleVisible = () => setIsShow((p) => !p);

  const onCreate = async (e) => {
    e.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <>
      <h1>Home Page</h1>
      <Link href="/">HOME</Link> <Link href="/transactions/second">SECOND</Link>
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
          return <li key={item._id}>{item.category}</li>;
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

