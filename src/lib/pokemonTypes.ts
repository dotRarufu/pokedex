import type { PokemonTypes } from "./types";

export const pokemonTypeColors = {
  fire: "#ed7c2f",
  grass: "#78c850",
  normal: "#a8a878",
  // todo:
};

export const pokemonTypes = Object.keys(pokemonTypeColors) as PokemonTypes[];
