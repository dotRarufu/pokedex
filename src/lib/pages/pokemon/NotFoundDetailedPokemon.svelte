<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import type { Readable } from "svelte/store";

  // todo: create getter helper
  const data = getContext<Readable<Pokemon | null>>("pokemonData");

  $: if ($data) push("/pokemon/" + $data.id + "/overview");

  console.log("not found deftailed");
</script>
