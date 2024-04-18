<script lang="ts">
  import PokemonType from "./PokemonType.svelte";
  import { pokemonTypes } from "./pokemonTypes";
  import { type PokemonTypes } from "./types";

  export let filter: PokemonTypes[] | null;

  const handleClick = (type: PokemonTypes) => {
    if (filter === null) {
      filter = [type];

      return;
    }

    if (filter.includes(type)) {
      filter = filter.filter((f) => f !== type);

      return;
    }

    filter = [...filter, type];
  };
</script>

<ul class="lg:px-[5rem] p-[1rem] sm:px-[2rem] flex flex-wrap gap-[1rem]">
  {#each pokemonTypes as type (type)}
    <PokemonType {handleClick} {type} />
  {/each}
</ul>
