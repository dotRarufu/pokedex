import type { PokemonTypes } from "./types";

export const pokemonTypeColors = {
  normal: "#a8a878",
  fire: "#ed7c2f",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c850",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#f0b6bc",
};

export const pokemonTypes = Object.keys(pokemonTypeColors) as PokemonTypes[];

export const statColors = {
  hp: "#cc6666",
  attack: "#ff9966",
  defense: "#6699cc",
  specialAttack: "#ffd966",
  specialDefense: "#9966cc",
  speed: "#66cc66",
};
