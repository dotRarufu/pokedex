import pokenode from "./pokenode";

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
  const pokemons = await pokenode.listPokemons(99999);

  return pokemons.count;
};
