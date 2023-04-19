import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";

export const HomeContext = createContext();

const ContextProvider = ({ children }) => {
  // const [count, setCount] = useState(0);
  // const [isShow, setIsShow] = useState(false);
  // const firstRender = useRef(true);

  const [pageNum, setPageNum] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  // const queryClient = useQueryClient();
  // console.log("ContextProvider", queryClient.getQueryData());

  // const { isLoading, data } = useQuery({
  //   queryKey: ["transactions", pageNum],
  //   queryFn: () => getAllTransactions(pageNum),
  //   // refetchOnWindowFocus: false,
  //   // enabled: false,
  //   onSuccess: (data) => {
  //     // setTransactions((prev) => [...prev, ...data]);
  //     setTransactions(data);
  //   },
  // });
  


  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }

  //   if (data) {
  //     setTransactions((prev) => [...prev, ...data]);
  //   }
  // }, [data]);

  return (
    <HomeContext.Provider
      value={{
        pageNum,
        setPageNum,

        transactions,
        setTransactions,

        isLoggedIn,
        setIsLoggedIn,
        // count,
        // setCount,
        // isShow,
        // setIsShow,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default ContextProvider;
