<script lang="ts">
  import { pokemonTypeColors } from "./pokemonTypes";
  import type { PokemonTypes } from "./types";

  export let type: PokemonTypes;

  const color = pokemonTypeColors[type];
</script>

<li
  class="rounded-[12px] w-fit py-[0.5rem] px-[1rem] sm:text-h6"
  style="background-color: {color};"
>
  <div class="relative">
    <span class="text-background-100 relative z-[2] capitalize"> {type} </span>
    <span
      class="z-[1] opacity-30 absolute left-[1px] text-text-500 top-[1px] capitalize"
    >
      {type}
    </span>
  </div>
</li>
