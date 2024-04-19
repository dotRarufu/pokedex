<script lang="ts">
  import { setContext } from "svelte";
  import pokenode from "../../pokenode";
  import type { Pokemon } from "pokenode-ts";
  // todo: rename to PokemonTypeChip
  import Overview from "./Overview.svelte";
  import Abilities from "./Abilities.svelte";
  import Stats from "./Stats.svelte";
  import Router from "svelte-spa-router";
  import NotFoundDetailedPokemon from "./NotFoundDetailedPokemon.svelte";
  import { readonly, writable } from "svelte/store";
  import PokemonImage from "../../PokemonImage.svelte";
  import TopNav from "./TopNav.svelte";
  import Nav from "./Nav.svelte";
  import DesktopBackground from "./DesktopBackground.svelte";
  import TabletBackground from "./TabletBackground.svelte";
  import MobileBackground from "./MobileBackground.svelte";
  import { location } from "svelte-spa-router";

  export let params: { id: string } = { id: "" };

  const id = writable<number | null>(null);
  const data = writable<Pokemon | null>(null);

  $: $id = Number(params.id);
  $: if ($id) getData($id);

  // or get data from cache
  const getData = async (id: number) => {
    $data = await pokenode.getPokemonById(id);
  };

  const routes = {
    "/overview": Overview,
    "/stats": Stats,
    "/abilities": Abilities,
    "*": NotFoundDetailedPokemon,
  };

  setContext("pokemonData", readonly(data));

  $: isTablet = windowWidth > 639;
  $: isDesktop = windowWidth > 1023;

  let windowWidth = 0;
  let windowScrollY = 0;

  $: isUserScrolled = false;

  const handleScroll = (e: any) => {
    // todo: type
    isUserScrolled = e.target.scrollTop < 1;
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="h-screen flex flex-col overflow-x-clip sm:bg-primary-500 lg:p-[3.25rem] bdev1"
>
  <!-- {#if isUserScrolled}
    <MobileBackground />
  {/if} -->

  {#if !isDesktop}
    <TopNav />
  {/if}

  {#if $data}
    <main
      on:scroll={handleScroll}
      class="hover:show-scrollbar hide-scrollbar h-full overflow-y-scroll lg:overflow-visible sm:rounded-[16px] px-[1rem] py-[2rem] sm:mx-auto sm:my-[2rem] lg:mb-0 sm:h-fit sm:max-w-[43.125rem] sm:bg-background-100 sm:p-[3.25rem] lg:w-full lg:max-w-[78.125rem] lg:h-full relative
      "
    >
      <MobileBackground />
      <TabletBackground />
      <DesktopBackground />

      <div
        class="relative lg:h-full lg:w-[calc(50%-1rem)] lg:inline-block lg:left-1/2"
      >
        <div class="lg:hidden left-0 px-[2rem] max-w-[28.25rem] mx-auto">
          <PokemonImage id={$data.id} name={$data.name} />
        </div>

        <div
          class="absolute hidden top-1/2 -translate-y-1/2 lg:block left-0 w-screen max-w-[120%]"
        >
          <PokemonImage id={$data.id} name={$data.name} />
        </div>
      </div>

      <div
        class="lg:overflow-y-scroll lg:hide-scrollbar lg:inline-block lg:w-[calc(50%-1rem)] relative lg:right-1/2 lg:h-full lg:pr-[2rem]"
      >
        <h1
          class="lg:text-start lg:text-h3 mb-[1rem] mt-[1rem] capitalize text-center text-h5"
        >
          {$data.name}
        </h1>

        {#if $id && isTablet}
          <Nav id={$id.toString()} />
        {/if}

        <Router {routes} prefix={/^\/pokemon\/[0-9]+/} />
      </div>
    </main>
  {/if}

  {#if $id && !isTablet}
    <Nav id={$id.toString()} />
  {/if}
</div>
