<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./lib/pages/home/Home.svelte";
  import DetailedPokemon from "./lib/pages/pokemon/DetailedPokemon.svelte";
  import NotFound from "./lib/pages/NotFound.svelte";

  const routes = {
    "/": Home,
    "/pokemon/:id/*": DetailedPokemon,
    "*": NotFound,
  };
</script>

<Router {routes} />
