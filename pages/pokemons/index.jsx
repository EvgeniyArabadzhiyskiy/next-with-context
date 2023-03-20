import About from "@/components/About";
import HomeProvider, { HomeContext } from "@/components/Context";
import { fetchPokemon } from "@/helpers/fetchPokemon";
import { getAllTransactions } from "@/helpers/getAllTransactions";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";

const HomePage = () => {
  const [ddd, setDdd] = useState([]);
  console.log("HomePage  ddd:", ddd);

  const { isShow, setIsShow } = useContext(HomeContext);

  const { data, error } = useSWR("pokeapi", fetcher);

  useEffect(() => {
    if (!data) {
      return;
    }

    setDdd((p) => [...p, data]);
  }, [data]);

  const toggleVisible = () => setIsShow((p) => !p);

  const hount = () => console.log("HELLO");

  return (
    <>
      <h1>Home Page</h1>

      <Link href="/">HOME</Link>
      <Link href="/pokemons/second">SECOND</Link>

      {isShow && <About />}
      <button type="button" onClick={toggleVisible}>
        {isShow ? "Скрыть" : "Показать"}
      </button>

      <button type="button" onClick={hount}>
        CLICK
      </button>
    </>
  );
};

const fetcher = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
  const data = await response.json();
  return data.name;
};

export default HomePage;
