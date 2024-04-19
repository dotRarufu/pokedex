<script lang="ts">
  import Header from "../../Header.svelte";
  import PokemonCards from "./PokemonCards.svelte";
  import type { SearchFilter } from "../../types";
  import PokemonSearch from "./PokemonSearch.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  import CardsBackground from "./CardsBackground.svelte";

  let filters: SearchFilter = { nameOrId: null, type: null };
  $: {
    const isNumber = !isNaN(filters.nameOrId as unknown as number);
    if (isNumber) {
      const id = Number(filters.nameOrId);

      if (id !== 0) {
        filters.nameOrId = id;
      }
    }

    filters.nameOrId;
  }
</script>

<div class="lg:h-screen lg:w-screen lg:overflow-clip">
  <Header />

  <main class=" lg:flex pb-[2rem] justify-between">
    <div class="">
      <PokemonSearch bind:filter={filters.nameOrId} />
      <PokemonTypes bind:filter={filters.type} />
    </div>

    <div class="relative h-full pb-[2rem]">
      <CardsBackground />
      <PokemonCards filter={filters} />
    </div>
  </main>
</div>
