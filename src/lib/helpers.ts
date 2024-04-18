import pokenode from "./pokenode";
import type { IPokemonCard } from "./types";

export const getPokemonImage = (id: number) => {
  const paddedId = addPadding(id.toString(), 3, "0");

  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId}.png`;
};

export const addPadding = (text: string, digits: number, placeholder: string) =>
  text.padStart(digits, placeholder);

export const getPokemons = async (page: number, amount: number) => {
  const offset = page * amount;
  const limit = offset + amount;

  const { results, next } = await pokenode.listPokemons(offset, limit);

  const pokemonCards: IPokemonCard[] = results.map((r, id) => ({
    id: id + 1,
    name: r.name,
  }));

  return { pokemonCards, next };
};
