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
  name: string | null;
  id: number | null;
  type: PokemonTypes[];
};
