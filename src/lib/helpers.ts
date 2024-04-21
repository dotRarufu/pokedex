import { GameClient, POKEDEXES } from "pokenode-ts";
import pokenode from "./pokenode";
import type { LocalStorageItem } from "./types";

export const getPokemonImage = (id: number) => {
  const paddedId = addPadding(id.toString(), 3, "0");

  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId}.png`;
};

export const addPadding = (text: string, digits: number, placeholder: string) =>
  text.padStart(digits, placeholder);

export const getPokemons = async (page: number, amount: number) => {
  const offset = page * amount;
  const limit = amount;

  const { results, next } = await pokenode.listPokemons(offset, limit);

  // Get pokemon profile
  // Types not present in listPokemons
  const requests = results.map((n) => pokenode.getPokemonByName(n.name));

  // todo: what if a request from array errors?
  const pokemons = await Promise.all(requests);

  return { pokemons, next };
};

export const decimeterToFoot = (decimeter: number) =>
  Math.round(decimeter * 0.33);
export const hectogramToKilogram = (hectogram: number) =>
  Math.round(hectogram * 0.1);

export const getRandomNumberInRange = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getMaxPokemonId = async () => {
  const gameClient = new GameClient();
  const { pokemon_entries } = await gameClient.getPokedexById(
    POKEDEXES.NATIONAL,
  );

  return pokemon_entries.length;
};

export const updateLocalstorage = (data: LocalStorageItem) => {
  const key = "rarufu-pokedex";

  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalstorage = () => {
  const key = "rarufu-pokedex";
  const defaultData: LocalStorageItem = {
    score: 0,
  };
  const found = localStorage.getItem(key);

  if (!found) return defaultData;

  return JSON.parse(found) as LocalStorageItem;
};

import cleanTextUtils from "clean-text-utils";

export const cleanText = (text: string) => {
  let res = text;

  res = cleanTextUtils.replace.diacritics(res);
  res = cleanTextUtils.replace.exoticChars(res);
  res = cleanTextUtils.replace.smartChars(res);
  res = cleanTextUtils.strip.bom(res);
  res = cleanTextUtils.strip.emoji(res);
  res = cleanTextUtils.strip.extraSpace(res);
  res = cleanTextUtils.strip.gutenberg(res);
  res = cleanTextUtils.strip.nonASCII(res);

  return res;
};

export const capitalizeSentences = (text: string): string => {
  // Split the text into an array of sentences
  const sentences = text.split(/(?<=[.!?])/);

  // Capitalize the first letter of each sentence and add a space after it
  const capitalizedSentences = sentences.map((sentence) => {
    // Trim any leading whitespace
    sentence = sentence.trim();
    sentence = sentence.replace(/,(?=[^\s])/g, ", ");
    // Capitalize the first letter of the sentence and add a space after it
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + " ";
  });

  // Join the sentences back into a single string
  return capitalizedSentences.join("");
};
