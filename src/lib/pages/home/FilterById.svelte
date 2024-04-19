<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import PokemonCard from "./PokemonCard.svelte";
  import pokenode from "../../pokenode";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let cachedData: Pokemon[] = [];
  export let idFilter: number;

  let data: Pokemon | null = null;

  const getPokemon = async () => {
    const match = cachedData.find((c) => c.id === idFilter);

    if (match) data = match;
    else {
      dispatch("fetchStart");
      try {
        data = await pokenode.getPokemonById(idFilter);
      } finally {
        dispatch("fetchEnd");
      }
    }
  };

  $: {
    idFilter, getPokemon();
  }
</script>

<!-- todo: deal with error -->
{#if data}
  {#key data.id}
    <PokemonCard {data} />
  {/key}
{/if}
