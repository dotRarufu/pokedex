<script lang="ts">
  import { pokemonTypeColors } from "./pokemonTypes";
  import type { PokemonTypes } from "./types";

  export let type: PokemonTypes;

  const color = pokemonTypeColors[type];

  let isSelected = false;

  // Maybe use event dispatcher?
  export let handleClick: (type: PokemonTypes) => void;

  const buttonClick = () => {
    isSelected = !isSelected;

    handleClick(type);
  };
</script>

<li
  class="border border-text-500 rounded-[12px] w-fit py-[0.5rem] px-[1rem] sm:text-h6"
  style="{isSelected ? `background-color: ${color}` : ''};"
>
  <button class="relative" on:click={buttonClick}>
    <span class="text-background-100 relative z-[2] capitalize"> {type} </span>
    <span
      class="z-[1] opacity-30 absolute left-[1px] text-text-500 top-[1px] capitalize"
    >
      {type}
    </span>
  </button>
</li>
