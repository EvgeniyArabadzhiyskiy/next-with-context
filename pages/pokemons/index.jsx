import Link from "next/link";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
      const data = await response.json();
      console.log("getTransactions  data:", data);
    };
    getTransactions();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <Link href="/">HOME</Link>
    </>
  );
};

export default HomePage;
