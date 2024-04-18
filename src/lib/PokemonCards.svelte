<script lang="ts">
  import InfiniteScroll from "svelte-infinite-scroll";
  import CardsBackground from "./CardsBackground.svelte";
  import PokemonCard from "./PokemonCard.svelte";
  import { onMount } from "svelte";
  import { getPokemons } from "./helpers";
  import type { IPokemonCard } from "./types";

  // Amount per batch
  const amount = 5;
  // Amount to scroll before running loadMore
  const threshold = 20;

  let page = 0;
  let data: IPokemonCard[] = [];
  let newBatch: IPokemonCard[] = [];
  let hasMore = true;

  const loadMore = async () => {
    const { pokemonCards, next } = await getPokemons(page, amount);
    newBatch = pokemonCards;
    page += 1;
    hasMore = next !== null;
  };

  onMount(async () => {
    const { next, pokemonCards } = await getPokemons(page, amount);
    data = pokemonCards;
    hasMore = next !== null;
  });

  $: data = [...data, ...newBatch].map(({ name }, index) => ({
    id: index + 1,
    name,
  }));
</script>

<ul
  class="sm:px-[2rem] px-[1rem] md:max-w-[31.75rem] gap-[1rem] justify-center sm:justify-start flex relative lg:pr-[5rem] flex-wrap"
>
  <CardsBackground />
  {#each data as datum (datum.id)}
    <!-- todo: add skeleton loader -->
    <PokemonCard data={datum} />
  {/each}

  <!-- elementScroll must overflow -->
  <InfiniteScroll window {threshold} {hasMore} on:loadMore={loadMore} />
</ul>
