import React from "react";
import axios from "axios";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PokemonCard from "@/components/PokemonCard";

const fetchPokemon = () =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/1`).then(({ data }) => data);

export const getStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getPokemon"], fetchPokemon);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Pokemon() {
  // const { data: pokemon } = useQuery(["getPokemon"], fetchPokemon);

  const { data: pokemon } = useQuery({
    queryKey: ["getPokemon"],
    queryFn: fetchPokemon,
  });
  console.log("Pokemon  pokemon:", pokemon?.name);

  // if (pokemon) {
  //   return <>Loading....</>
  // }

  return (
    <div className="container">
      <PokemonCard
        name={pokemon?.name}
        image={pokemon?.sprites?.other?.["official-artwork"]?.front_default}
        weight={pokemon?.weight}
        xp={pokemon?.base_experience}
        // abilities={pokemon?.abilities?.map((item) => item.ability.name)}
      />
    </div>
  );
}
