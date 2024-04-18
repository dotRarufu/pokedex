<script lang="ts">
  import InfiniteScroll from "svelte-infinite-scroll";
  import CardsBackground from "./CardsBackground.svelte";
  import PokemonCard from "./PokemonCard.svelte";
  import { onMount } from "svelte";
  import { addPokemonId, getPokemons } from "./helpers";
  import type { IPokemonCard } from "./types";
  import type { SearchFilter } from "./types";
  import pokenode from "./pokenode";

  // Amount per batch
  const amount = 5;
  // Amount to scroll before running loadMore
  const threshold = 20;

  export let filter: SearchFilter;

  let page = 0;
  let data: IPokemonCard[] = [];
  let hasMore = true;
  let filteredData: IPokemonCard[] = [];

  $: hasFilter = filter.nameOrId !== null || filter.type !== null;

  $: if (hasFilter && typeof filter.nameOrId === "string") {
    const keywordFilter = filter.nameOrId;
    filteredData = data.filter((d) => d.name.includes(keywordFilter));

    if (filteredData.length < 5 && data.length > 0) loadMore();
  }

  $: if (hasFilter && typeof filter.nameOrId === "number") {
    const idFilter = filter.nameOrId;
    pokenode
      .getPokemonById(idFilter)
      .then((p) => (filteredData = [{ id: idFilter, name: p.name }]));
  }

  const loadMore = async () => {
    const { pokemons, next } = await getPokemons(page, amount);
    const startId = data.length + 1;
    const newBatch = addPokemonId(startId, pokemons);

    data = [...data, ...newBatch];
    hasMore = next !== null;
    page += 1;
  };

  onMount(async () => {
    const { next, pokemons } = await getPokemons(page, amount);
    const startId = data.length || 1;
    const newBatch = addPokemonId(startId, pokemons);

    data = [...data, ...newBatch];
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
