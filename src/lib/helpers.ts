export const getPokemonImage = (id: number) => {
  const paddedId = id.toString().padStart(3, "0");

  return `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedId}.png`;
};
