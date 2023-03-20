import { useContext, useEffect } from "react";
import HomeProvider, { HomeContext } from "./Context";

const About = () => {
  const { count, setCount } = useContext(HomeContext);

  const incrementCount = () => setCount((p) => p + 1);
  const decrementCount = () => setCount((p) => p - 1);

  return (
    <>
      <h1>About Component</h1>

      <h2>{count}</h2>

      <button type="button" onClick={incrementCount}>
        Добавить
      </button>

      <button type="button" onClick={decrementCount}>
        Отнять
      </button>
    </>
  );
};

export default About;
