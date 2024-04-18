<script lang="ts">
  import InfiniteScroll from "svelte-infinite-scroll";
  import CardsBackground from "./CardsBackground.svelte";
  import PokemonCard from "./PokemonCard.svelte";
  import { onMount } from "svelte";
  import { getPokemons } from "./helpers";
  import type { SearchFilter } from "./types";
  import pokenode from "./pokenode";
  import type { Pokemon } from "pokenode-ts";
  import { isArraySubset } from "./utils";

  // Amount per batch
  const amount = 3;
  // Amount to scroll before running loadMore
  const threshold = 20;

  export let filter: SearchFilter;

  let page = 0;
  let data: Pokemon[] = [];
  let hasMore = true;
  let filteredData: Pokemon[] = [];
  let rerun = true;

  $: hasFilter = filter.nameOrId !== null || filter.type !== null;

  $: filterByName = rerun && hasFilter && typeof filter.nameOrId === "string";
  $: filterById = hasFilter && typeof filter.nameOrId === "number";
  $: filterByType =
    hasFilter && filter.type !== null && filter.type.length > 0 && rerun;

  $: if (filterByName) findPokemonsByName();

  $: if (filterById) {
    const idFilter = filter.nameOrId as number;
    pokenode.getPokemonById(idFilter).then((p) => (filteredData = [p]));
  }

  $: if (filterByType) findPokemonsByType();

  const findPokemonsByName = async () => {
    // improve type
    const keywordFilter = filter.nameOrId as string;

    let newDataCount = 0;

    do {
      const filteredDataIds = filteredData.map((f) => f.id);

      const dataMinusFiltered = data.filter(
        (d) => !filteredDataIds.includes(d.id),
      );

      const match = dataMinusFiltered.filter((d) =>
        d.name.includes(keywordFilter),
      );
      newDataCount += match.length;

      if (match.length > 0) filteredData = [...filteredData, ...match];

      await getMoreData();
    } while (newDataCount < amount);

    rerun = false;
  };

  const findPokemonsByType = async () => {
    const typeFilters = filter.type!;
    let newDataCount = 0;

    do {
      const filteredDataIds = filteredData.map((f) => f.id);

      const dataMinusFiltered = data.filter(
        (d) => !filteredDataIds.includes(d.id),
      );

      const match = dataMinusFiltered.filter((pokemon) => {
        const types = pokemon.types.map((p) => p.type.name);

        return isArraySubset(types, typeFilters);
      });
      newDataCount += match.length;
      if (match.length > 0) filteredData = [...filteredData, ...match];

      await getMoreData();
    } while (newDataCount < amount);

    rerun = false;
  };

  const loadMore = async () => {
    if (rerun) return;

    rerun = true;

    await getMoreData();
  };

  const getMoreData = async () => {
    // todo: add indicator while loading for more data

    const { pokemons, next } = await getPokemons(page, amount);

    data = [...data, ...pokemons];

    hasMore = next !== null;
    page += 1;
  };

  onMount(async () => {
    const { next, pokemons } = await getPokemons(page, amount);

    data = [...data, ...pokemons];
    hasMore = next !== null;
    page += 1;
  });
</script>

<ul
  class="sm:px-[2rem] px-[1rem] md:max-w-[31.75rem] gap-[1rem] justify-center sm:justify-start flex relative lg:pr-[5rem] flex-wrap"
>
  <CardsBackground />
  {#if hasFilter}
    {#each filteredData as datum (datum.id)}
      <PokemonCard data={datum} />
    {/each}
  {:else}
    {#each data as datum (datum.id)}
      <!-- todo: add skeleton loader -->
      <PokemonCard data={datum} />
    {/each}
  {/if}

  <!-- elementScroll must overflow -->
  <InfiniteScroll window {threshold} {hasMore} on:loadMore={loadMore} />
</ul>
