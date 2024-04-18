export type IPokemonCard = {
  name: string;
  id: number;
};

export type PokemonTypes =
  | "fire"
  | "grass"
  | "normal"
  | "water"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export type SearchFilter = {
  nameOrId: string | number | null;
  type: PokemonTypes[] | null;
};
