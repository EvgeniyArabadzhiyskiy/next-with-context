import { createContext, useState } from "react";

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isShow, setIsShow] = useState(false);

  return (
    <HomeContext.Provider value={{ count, setCount, isShow, setIsShow }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
