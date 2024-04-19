<script lang="ts">
  import { pokemonTypeColors } from "../../pokemonTypes";
  import type { PokemonTypes } from "../../types";

  export let type: PokemonTypes;
  export let isSmall = false;

  const color = pokemonTypeColors[type];

  let isSelected = false;

  // Maybe use event dispatcher?
  export let handleClick: null | ((type: PokemonTypes) => void) = null;

  const buttonClick = () => {
    isSelected = !isSelected;

    handleClick && handleClick(type);
  };
</script>

<li
  class="rounded-[12px] w-fit px-[1rem] sm:text-h6"
  style="opacity: {!handleClick || isSelected ? '1' : '0.3'};
  background-color: {color};
  padding-top: {!isSmall ? '0.5rem' : '0.25rem'};
  padding-bottom: {!isSmall ? '0.5rem' : '0.25rem'};"
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
