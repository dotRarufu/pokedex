<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import PokemonCard from "./PokemonCard.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import pokenode from "./pokenode";

  export let cachedData: Pokemon[] = [];
  export let idFilter: number;

  let data: Pokemon;

  onMount(async () => {
    const match = cachedData.find((c) => c.id === idFilter);

    if (match) data = match;
    else data = await pokenode.getPokemonById(idFilter);
  });
</script>

<PokemonCard {data} />
