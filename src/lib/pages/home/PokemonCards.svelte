<script lang="ts">
  import InfiniteScroll from "svelte-infinite-scroll";
  import PokemonCard from "./PokemonCard.svelte";
  import { onMount } from "svelte";

  import type { Pokemon } from "pokenode-ts";
  import FilterByName from "./FilterByName.svelte";
  import FilterByType from "./FilterByType.svelte";
  import FilterById from "./FilterById.svelte";
  import type { SearchFilter } from "../../types";
  import { getPokemons } from "../../helpers";
  import LoadingIndicator from "../../LoadingIndicator.svelte";

  // Amount per batch
  let amount = 10;
  // Amount to scroll before running loadMore
  const threshold = 20;

  export let sort: {
    property: "name" | "id";
    direction: "up" | "down";
  } | null = null;
  export let filter: SearchFilter;

  let isFetching = false;
  let page = 0;
  let data: Pokemon[] = [];
  let hasMore = true;

  let selectedFilter: "name" | "id" | "type" | null = null;

  $: {
    // First match wins
    if (filter.name) selectedFilter = "name";
    else if (filter.id && filter.id > 0) selectedFilter = "id";
    else if (filter.type.length > 0) selectedFilter = "type";
    else selectedFilter = null;
  }

  let timeoutId: number;

  const getMoreData = async () => {
    isFetching = true;
    clearTimeout(timeoutId);
    try {
      const { pokemons, next } = await getPokemons(page, amount);

      data = [...data, ...pokemons];
      hasMore = next !== null;
      page += 1;
    } finally {
      // for smooth turn off
      timeoutId = setTimeout(() => {
        isFetching = false;
      }, 2000);
    }
  };

  onMount(getMoreData);

  let uniqueData: Pokemon[] = [];

  $: {
    // Unsure why raw data causes key duplicate
    const unique = new Set<Pokemon>();
    data.forEach((d) => unique.add(d));

    uniqueData = [...unique];

    if (sort === null || sort.property === "id") {
      if (sort?.direction === "up")
        uniqueData = uniqueData.toSorted((a, b) => b.id - a.id);
      else uniqueData = uniqueData.toSorted((a, b) => a.id - b.id);

      break $;
    }

    if (sort.property === "name") {
      uniqueData = uniqueData.toSorted((a, b) => {
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

  // todo: fix type
  $: name = filter.name as string;
  $: types = filter.type || [];
  $: id = filter.id as number;

  let container: HTMLUListElement;
  $: isDesktop = windowWidth > 1023;
  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<ul
  bind:this={container}
  class=" sm:px-[2rem] px-[1rem] gap-[1rem] justify-center relative h-full sm:justify-start flex-wrap flex lg:max-w-[42.35rem] lg:justify-center lg:pr-[5rem] lg:max-h-screen lg:overflow-y-scroll lg:overflow-x-clip lg:py-[2rem]"
>
  {#if isFetching}
    <LoadingIndicator />
  {/if}

  {#if selectedFilter === "name"}
    <FilterByName
      {sort}
      cachedData={data}
      nameFilter={name}
      on:requireMoreData={getMoreData}
    />
  {:else if selectedFilter === "type"}
    <FilterByType
      {sort}
      cachedData={data}
      typesFilter={types}
      on:requireMoreData={getMoreData}
    />
  {:else if selectedFilter === "id"}
    <FilterById
      idFilter={id}
      cachedData={data}
      on:fetchStart={() => (isFetching = true)}
      on:fetchEnd={() => (isFetching = false)}
    />
  {:else}
    {#each uniqueData as datum (datum.id)}
      <PokemonCard data={datum} />
    {/each}
  {/if}

  <!-- elementScroll must overflow -->
  {#if !isDesktop}
    <InfiniteScroll window {threshold} {hasMore} on:loadMore={getMoreData} />
  {:else}
    <InfiniteScroll
      elementScroll={container}
      {threshold}
      {hasMore}
      on:loadMore={getMoreData}
    />
  {/if}
</ul>
