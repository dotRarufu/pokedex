export type IPokemonCard = {
  name: string;
  id: number;
};

export type PokemonTypes = "fire" | "grass" | "normal";

export type SearchFilter = {
  nameOrId: string | number | null;
  type: PokemonTypes[] | null;
};
