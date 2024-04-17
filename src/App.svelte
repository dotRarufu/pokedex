<script lang="ts">
  import PokemonType from "./lib/PokemonType.svelte";
  import { pokemonTypes } from "./lib/pokemonTypes";
  import PokemonCard from "./lib/PokemonCard.svelte";
</script>

<div class="lg:h-screen lg:w-screen lg:overflow-clip">
  <header
    class="sticky top-0 left-0 p-[1rem] sm:p-[2rem] md:bg-transparent bg-primary-500"
  >
    <h1 class="text-text-50 text-h6">Pokédex</h1>
  </header>

  <main class=" lg:flex pb-[2rem] justify-between">
    <div>
      <div
        class="p-[1rem] lg:px-[5rem] sm:p-[2rem] md:bg-transparent bg-primary-500"
      >
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
    </div>

    <ul
      class="sm:px-[2rem] px-[1rem] md:max-w-[31.75rem] gap-[1rem] justify-center sm:justify-start flex flex-wrap relative lg:pr-[5rem]"
    >
      <div
        class="-z-[1] -left-[4rem] -translate-y-1/2 top-1/2 lg:block absolute hidden"
      >
        <div class="bg-primary-500/50 w-[100vw] rotate-[13deg] h-[300vh]" />
      </div>
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
    </ul>
  </main>
</div>
