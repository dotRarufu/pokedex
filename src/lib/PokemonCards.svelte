<script lang="ts">
  import InfiniteScroll from "svelte-infinite-scroll";
  import CardsBackground from "./CardsBackground.svelte";
  import PokemonCard from "./PokemonCard.svelte";
  import { onMount } from "svelte";
  import { getPokemons } from "./helpers";
  import type { SearchFilter } from "./types";
  import type { Pokemon } from "pokenode-ts";
  import FilterByName from "./FilterByName.svelte";
  import FilterByType from "./FilterByType.svelte";
  import FilterById from "./FilterById.svelte";

  // Amount per batch
  const amount = 3;
  // Amount to scroll before running loadMore
  const threshold = 20;

  export let filter: SearchFilter;

  let page = 0;
  let data: Pokemon[] = [];
  let hasMore = true;

  $: hasFilter = filter.nameOrId !== null || filter.type !== null;
  $: filterByName = hasFilter && typeof filter.nameOrId === "string";
  $: filterById = hasFilter && typeof filter.nameOrId === "number";
  $: filterByType = hasFilter && filter.type !== null && filter.type.length > 0;

  const getMoreData = async () => {
    // todo: add indicator while loading for more data

    const { pokemons, next } = await getPokemons(page, amount);

    data = [...data, ...pokemons];
    hasMore = next !== null;
    page += 1;
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
  $: name = filter.nameOrId as string;
  $: types = filter.type || [];
  $: id = filter.nameOrId as number;

  $: console.log("filters:", filter);
</script>

<ul
  class="sm:px-[2rem] px-[1rem] md:max-w-[31.75rem] gap-[1rem] justify-center sm:justify-start flex relative lg:pr-[5rem] flex-wrap"
>
  <CardsBackground />
  {#if filterByName}
    <FilterByName
      cachedData={data}
      nameFilter={name}
      on:requireMoreData={getMoreData}
    />
  {:else if filterByType}
    <FilterByType
      cachedData={data}
      typesFilter={types}
      on:requireMoreData={getMoreData}
    />
  {:else if filterById}
    <FilterById idFilter={id} cachedData={data} />
  {:else}
    {#each uniqueData as datum (datum.id)}
      <PokemonCard data={datum} />
    {/each}
  {/if}

  <!-- elementScroll must overflow -->
  <InfiniteScroll window {threshold} {hasMore} on:loadMore={getMoreData} />
</ul>
