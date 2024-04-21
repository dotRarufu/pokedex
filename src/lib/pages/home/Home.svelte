<script lang="ts">
  import Header from "../../Header.svelte";
  import PokemonCards from "./PokemonCards.svelte";
  import type { SearchFilter } from "../../types";
  import PokemonSearch from "./PokemonSearch.svelte";
  import PokemonTypes from "./PokemonTypes.svelte";
  // todo: fix name
  import type { PokemonTypes as IPokemonTypes } from "../../types";
  import CardsBackground from "./CardsBackground.svelte";
  import RandomPokemonButton from "../../RandomPokemonButton.svelte";
  import { fade } from "svelte/transition";
  import PlayButton from "../../PlayButton.svelte";
  import Sort from "./Sort.svelte";

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

  let sort: {
    property: "name" | "id";
    direction: "up" | "down";
  } | null = null;
</script>

<div
  in:fade={{ duration: 150, delay: 150 }}
  out:fade={{ duration: 150 }}
  class="bg-background-100 lg:h-screen lg:w-screen lg:overflow-clip"
>
  <Header />

  <main class="h-[calc(100%-5.625rem)] lg:flex pb-[2rem] justify-between">
    <div class="lg:flex lg:flex-col lg:overflow-y-auto z-[1]">
      <PokemonSearch
        {updateNameFilter}
        {updateIdFilter}
        name={filters.name}
        id={filters.id}
      />
      <div class="">
        <PokemonTypes {updateTypeFilter} filter={filters.type} />
      </div>

      <Sort bind:sorter={sort} />

      <ul
        class="pt-[4rem] justify-end flex-col h-full px-[5rem] hidden lg:flex"
      >
        <PlayButton />
        <RandomPokemonButton />
      </ul>
    </div>

    <div class="relative h-screen lg:-top-[5.625rem]">
      <CardsBackground />
      <PokemonCards {sort} filter={filters} />
    </div>
  </main>
</div>
