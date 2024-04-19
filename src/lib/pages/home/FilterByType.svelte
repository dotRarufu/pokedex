<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import PokemonCard from "./PokemonCard.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import InfiniteScroll from "svelte-infinite-scroll";
  import type { PokemonTypes } from "../../types";
  import { isArraySubset } from "../../utils";

  const amount = 10;
  const threshold = 80;
  const dispatch = createEventDispatcher();

  export let cachedData: Pokemon[] = [];
  export let typesFilter: PokemonTypes[];

  let filteredData: Pokemon[] = [];
  let addedData: Pokemon[] = [];

  // Clear filtered data on name filter update
  $: {
    typesFilter, (filteredData = []);
  }

  $: {
    // Get new filtered data;
    const match = cachedData.filter((c) => {
      const types = c.types.map((t) => t.type.name);

      // rename: uses .some
      return isArraySubset(types, typesFilter);
    });

    const isInitialLoaded = filteredData.length >= amount;

    // This exceeds expected amount, unsure why
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
    if (filteredData.length < amount) {
      dispatch("requireMoreData");
    }
  }

  onMount(() => {
    if (filteredData.length < amount) {
      dispatch("requireMoreData");
    }
  });
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
