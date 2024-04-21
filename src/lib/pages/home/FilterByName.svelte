<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import PokemonCard from "./PokemonCard.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import InfiniteScroll from "svelte-infinite-scroll";

  const amount = 10;
  const threshold = 80;
  const dispatch = createEventDispatcher();

  export let sort: {
    property: "name" | "id";
    direction: "up" | "down";
  } | null = null;
  export let cachedData: Pokemon[] = [];
  export let nameFilter: string;

  let filteredData: Pokemon[] = [];
  let addedData: Pokemon[] = [];

  // Clear filtered data on name filter update
  $: {
    nameFilter, (filteredData = []);
  }

  $: {
    // Get new filtered data;
    const match = cachedData.filter((d) => d.name.includes(nameFilter));

    const isInitialLoaded = filteredData.length >= amount;

    if (isInitialLoaded) {
      // Get new added data;
      const filtered = filteredData.map((f) => f.id);
      const realDiff = match.filter((m) => !filtered.includes(m.id));

      // Infinite scroll: keep loading unti reach amount
      if (addedData.length < amount) {
        addedData = [...addedData, ...realDiff];
        dispatch("requireMoreData");
      }
    }

    // Remove duplicates (unsure why)
    const unique = new Set<Pokemon>();
    match.forEach((d) => unique.add(d));
    filteredData = [...unique];

    // Initial: keep loading data until has amount
    if (cachedData && filteredData.length < amount) {
      dispatch("requireMoreData");
    }
  }

  $: {
    const unique = new Set<Pokemon>();
    filteredData.forEach((d) => unique.add(d));

    if (sort === null || sort.property === "id") {
      if (sort?.direction === "up")
        filteredData = filteredData.toSorted((a, b) => a.id - b.id);
      else filteredData = filteredData.toSorted((a, b) => b.id - a.id);

      break $;
    }

    if (sort.property === "name") {
      filteredData = filteredData.toSorted((a, b) => {
        if (a.name < b.name) {
          return sort?.direction === "down" ? 1 : -1;
        }
        if (a.name > b.name) {
          return sort?.direction === "down" ? -1 : 1;
        }
        return 0;
      });

      break $;
    }
  }
</script>

{#each filteredData as data (data.id)}
  <PokemonCard {data} />
{/each}

<!-- todo: dynamically set max pokemon number -->
<InfiniteScroll
  window
  {threshold}
  hasMore={cachedData.length < 1302}
  on:loadMore={() => {
    // Set to empty to automatically get more data until amount
    addedData = [];
  }}
/>
