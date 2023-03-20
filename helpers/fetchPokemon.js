import axios from "axios";

export const fetchPokemon = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  // const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};
