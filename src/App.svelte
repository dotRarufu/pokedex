<script lang="ts">
  import Router from "svelte-spa-router";
  import Home from "./lib/pages/home/Home.svelte";
  import DetailedPokemon from "./lib/pages/pokemon/DetailedPokemon.svelte";
  import NotFound from "./lib/pages/NotFound.svelte";
  import PageLoader from "./lib/PageLoader.svelte";
  import Quiz from "./lib/pages/quiz/Quiz.svelte";

  let isLoading = true;

  const routeLoading = (event: any) => {
    isLoading = true;
  };

  const routeLoaded = (event: any) => {
    isLoading = false;
  };

  const routes = {
    "/": Home,
    "/pokemon/:id/*": DetailedPokemon,
    "/pokemon/*": DetailedPokemon,
    "/quiz": Quiz,
    "*": NotFound,
  };
</script>

<PageLoader {isLoading} />

<!-- background color, for transition -->
<div class="w-screen h-screen bg-primary-400 absolute left-0 top-0 -z-[1]" />

<Router {routes} on:routeLoading={routeLoading} on:routeLoaded={routeLoaded} />
