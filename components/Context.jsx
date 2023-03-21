import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState(false);


  const [ddd, setDdd] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPageNum] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["pokemon", pageNum],
    queryFn: () => getAllTransactions(pageNum),
    enabled: pageNum.length > 0,
  });

  useEffect(() => {
    if (data) setDdd((prev) => [...prev, ...data]);
  }, [data]);

  return (
    <HomeContext.Provider value={{ddd, setPageNum, searchValue, setSearchValue, count, setCount, isShow, setIsShow }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
