import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";

export const HomeContext = createContext();

const ContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const firstRender = useRef(true);

  const { isLoading, data } = useQuery({
    queryKey: ["transactions", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    refetchOnWindowFocus: false,
  });


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (data) {
      setPokemon((prev) => [...prev, ...data]);
    }
  }, [data]);

  return (
    <HomeContext.Provider
      value={{
        pokemon,
        setPageNum,
        count,
        setCount,
        isShow,
        setIsShow,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default ContextProvider;
