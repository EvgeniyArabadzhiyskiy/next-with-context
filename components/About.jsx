import { fetchPokemon } from "@/helpers/fetchPokemon";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import HomeProvider, { HomeContext } from "./Context";
import useSWR from "swr";

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

const fetcher = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur");
  const data = await response.json();
  return data;
};

export default About;
