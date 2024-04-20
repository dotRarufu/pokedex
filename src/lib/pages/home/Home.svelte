<script lang="ts">
  import Header from "../../Header.svelte";
  import PokemonCards from "./PokemonCards.svelte";
  import type { SearchFilter } from "../../types";
  import PokemonSearch from "./PokemonSearch.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  // todo: fix name
  import type { PokemonTypes as IPokemonTypes } from "../../types";
  import CardsBackground from "./CardsBackground.svelte";

  // Null is initial value, empty string or 0 is for cleared
  let filters: SearchFilter = {
    id: null,
    name: null,
    type: [],
  };

  // Either name or type is activated at a time
  const updateNameFilter = (nameFilter: string) => {
    filters.name = nameFilter;
    filters.id = 0;
    filters.type = [];
  };

  const updateIdFilter = (idFilter: number) => {
    filters.id = idFilter;
    filters.name = "";
    filters.type = [];
  };

  const updateTypeFilter = (typesFilter: IPokemonTypes[]) => {
    filters.id = 0;
    filters.name = "";
    filters.type = typesFilter;
  };
</script>

<div class="lg:h-screen lg:w-screen lg:overflow-clip">
  <Header />

  <main class="h-[calc(100%-5.625rem)] lg:flex pb-[2rem] justify-between">
    <div class="">
      <PokemonSearch
        {updateNameFilter}
        {updateIdFilter}
        name={filters.name}
        id={filters.id}
      />
      <PokemonTypes {updateTypeFilter} filter={filters.type} />
    </div>

    <!-- min-w-[42.35rem] -->
    <div class="relative h-screen lg:-top-[5.625rem]">
      <!-- <div class=" h-screen top-0 pb-[2rem]"> -->
      <CardsBackground />
      <PokemonCards filter={filters} />
      <!-- </div> -->
    </div>
  </main>
</div>
