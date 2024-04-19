<script lang="ts">
  import { pokemonTypeColors } from "../../pokemonTypes";
  import type { PokemonTypes } from "../../types";

  export let type: PokemonTypes;
  export let isSmall = false;

  const color = pokemonTypeColors[type];

  export let isSelected = false;

  // Maybe use event dispatcher?
  export let handleClick: null | ((type: PokemonTypes) => void) = null;

  const buttonClick = () => {
    // isSelected = !isSelected;

    handleClick && handleClick(type);
  };
</script>

<li class="">
  <button
    on:click={buttonClick}
    style="
    cursor: {!handleClick ? 'default' : 'pointer'};
  background-color: {!handleClick || isSelected ? color : 'hsl(225, 3%, 70%)'};
  padding-top: {!isSmall ? '0.5rem' : '0.25rem'};
  padding-bottom: {!isSmall ? '0.5rem' : '0.25rem'};"
    class="transition-colors rounded-[12px] w-fit px-[1rem] sm:text-h6 relative shadow-md"
  >
    <span class="text-background-100 relative z-[1] capitalize">
      {type}
      <span
        class="-z-[1] opacity-30 absolute left-[1px] text-text-500 top-[1px] capitalize"
      >
        {type}
      </span>
    </span>
  </button>
</li>
