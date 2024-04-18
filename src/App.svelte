<script lang="ts">
  import Header from "./lib/Header.svelte";
  import PokemonCards from "./lib/PokemonCards.svelte";
  import PokemonSearch from "./lib/PokemonSearch.svelte";
</script>

<div class="lg:h-screen lg:w-screen lg:overflow-clip">
  <Header />

  <main class="lg:flex pb-[2rem] justify-between">
    <div>
      <PokemonSearch />
    </div>

    <PokemonCards filter={{ nameOrId: 393, type: null }} />
    <!-- <PokemonCards filter={{ nameOrId: null, type: null }} /> -->
  </main>
</div>
