<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./lib/home/Home.svelte";
  import DetailedPokemon from "./lib/pokemon/DetailedPokemon.svelte";

  const routes = {
    "/": Home,
    "/pokemon/:id": DetailedPokemon,
  };
</script>

<Router {routes} />
