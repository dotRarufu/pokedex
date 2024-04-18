<script>
  import PokemonType from "./PokemonType.svelte";
  import { pokemonTypes } from "./pokemonTypes";
</script>

<ul class="lg:px-[5rem] p-[1rem] sm:px-[2rem] flex flex-wrap gap-[1rem]">
  {#each pokemonTypes as type (type)}
    <PokemonType {type} />
  {/each}
</ul>
