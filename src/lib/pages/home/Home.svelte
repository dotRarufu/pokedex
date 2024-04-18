<script lang="ts">
  import Header from "../Header.svelte";
  import PokemonCards from "../PokemonCards.svelte";
  import PokemonSearch from "../PokemonSearch.svelte";
  import PokemonTypes from "../PokemonTypes.svelte";
  import type { SearchFilter } from "../types";

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

  <main class="lg:flex pb-[2rem] justify-between">
    <div>
      <PokemonSearch bind:filter={filters.nameOrId} />
      <PokemonTypes bind:filter={filters.type} />
    </div>

    <PokemonCards filter={filters} />
  </main>
</div>
