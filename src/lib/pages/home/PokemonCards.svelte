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

  // Amount per batch
  let amount = 10;
  // Amount to scroll before running loadMore
  const threshold = 20;

  export let filter: SearchFilter;
  let isFetching = false;
  let page = 0;
  let data: Pokemon[] = [];
  let hasMore = true;

  $: hasFilter = filter.id || filter.name || filter.type;

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
  class=" sm:px-[2rem] px-[1rem] md:max-w-[31.75rem] lg:max-w-[42.35rem] gap-[1rem] justify-center sm:justify-start flex lg:justify-center relative lg:pr-[5rem] lg:max-h-screen flex-wrap lg:overflow-y-scroll lg:overflow-x-clip"
>
  {#if isFetching}
    <div
      class="fixed block bottom-[1rem] right-[1rem] z-[99999] rounded-[12px] px-[1rem] py-[0.5rem] animate-bounce text-background-200 bg-[#6890f0]"
    >
      Loading Data
    </div>
  {/if}

  {#if selectedFilter === "name"}
    <FilterByName
      cachedData={data}
      nameFilter={name}
      on:requireMoreData={getMoreData}
    />
  {:else if selectedFilter === "type"}
    <FilterByType
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
