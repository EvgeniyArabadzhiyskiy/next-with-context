import  { HomeContext } from "@/components/Context";
import Link from "next/link";
import { useContext } from "react";

const SecondPage = () => {
  const { count, setCount } = useContext(HomeContext);

  const incrementCount = () => setCount((p) => p + 1);
  const decrementCount = () => setCount((p) => p - 1);

  return (
    <>
      <h1>Home Page</h1>
      <h2>{count}</h2>

      <Link href="/">HOME</Link>
      <Link href="/pokemons">POKEMONS</Link>

      <button type="button" onClick={incrementCount}>
        Добавить
      </button>

      <button type="button" onClick={decrementCount}>
        Отнять
      </button>
    </>
  );
};

export default SecondPage;


// useEffect(() => {
//   const getTransactions = async () => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
//     const data = await response.json();
//     console.log("getTransactions  data:", data);
//   };
//   getTransactions();
// }, []);
