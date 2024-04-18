<script lang="ts">
  import PokemonType from "./PokemonType.svelte";
  import { pokemonTypes } from "./pokemonTypes";
</script>

<div class="p-[1rem] lg:px-[5rem] sm:p-[2rem] md:bg-transparent bg-primary-500">
  <h2 class="text-h6 sm:text-h4 md:max-w-[26.25rem]">
    What pokemon are you looking for?
  </h2>
  <input
    type="text"
    placeholder="Name or ID"
    class="mt-[1rem] rounded-[8px] bg-text-950 px-[1.25rem] py-[0.5rem] w-full max-w-[20.5rem]"
  />
</div>

<ul class="lg:px-[5rem] p-[1rem] sm:px-[2rem] flex flex-wrap gap-[1rem]">
  {#each pokemonTypes as type (type)}
    <PokemonType {type} />
  {/each}
</ul>
