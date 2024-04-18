<script lang="ts">
  import Header from "./lib/Header.svelte";
  import PokemonCards from "./lib/PokemonCards.svelte";
  import PokemonSearch from "./lib/PokemonSearch.svelte";
  import PokemonTypes from "./lib/PokemonTypes.svelte";
  import type { SearchFilter } from "./lib/types";

  let filters: SearchFilter = { nameOrId: null, type: null };

  $: filters.nameOrId = filters.nameOrId === "" ? null : filters.nameOrId;
</script>

<div class="lg:h-screen lg:w-screen lg:overflow-clip">
  <Header />

  <main class="lg:flex pb-[2rem] justify-between">
    <div>
      <PokemonSearch bind:filter={filters.nameOrId} />
      <PokemonTypes />
    </div>

    <PokemonCards filter={filters} />
  </main>
</div>
