<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import type { Readable } from "svelte/store";

  // todo: create getter helper
  const id = getContext<Readable<number>>("pokemonId");

  onMount(() => {
    push("/pokemon/" + $id + "/overview");
  });
</script>
