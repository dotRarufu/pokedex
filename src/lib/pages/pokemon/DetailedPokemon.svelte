<script lang="ts">
  import { setContext } from "svelte";
  import pokenode from "../../pokenode";
  import type { Pokemon } from "pokenode-ts";
  // todo: rename to PokemonTypeChip
  import Overview from "./Overview.svelte";
  import Abilities from "./Abilities.svelte";
  import Stats from "./Stats.svelte";
  import Router, { push } from "svelte-spa-router";
  import NotFoundDetailedPokemon from "./NotFoundDetailedPokemon.svelte";
  import { readonly, writable } from "svelte/store";
  import PokemonImage from "../../PokemonImage.svelte";
  import TopNav from "./TopNav.svelte";
  import Nav from "./Nav.svelte";
  import DesktopBackground from "./DesktopBackground.svelte";
  import TabletBackground from "./TabletBackground.svelte";
  import MobileBackground from "./MobileBackground.svelte";
  import DesktopSequenceNav from "./DesktopSequenceNav.svelte";

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

  $: if (isNaN($id as number)) push("/");

  setContext("pokemonData", readonly(data));

  $: isTablet = windowWidth > 639;
  $: isDesktop = windowWidth > 1023;

  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
  class="h-screen flex flex-col overflow-x-clip sm:bg-primary-500 lg:p-[3.25rem] overflow-clip"
>
  {#if !isDesktop}
    <TopNav id={$id || 1} />
  {/if}

  {#if $data}
    <main
      class="hover:show-scrollbar hide-scrollbar h-full overflow-y-scroll lg:overflow-visible sm:rounded-[16px] px-[1rem] py-[2rem] sm:mx-auto sm:my-[2rem] lg:mb-0 sm:h-fit sm:max-w-[43.125rem] sm:bg-background-100 sm:p-[3.25rem] lg:w-full lg:max-w-[78.125rem] lg:h-full relative lg:max-h-[42.0625rem] sm:shadow-xl
      "
    >
      <MobileBackground />
      <TabletBackground />
      <DesktopBackground />
      <DesktopSequenceNav id={$data.id} />

      <div
        class="relative lg:h-full lg:w-[calc(50%-1rem)] lg:inline-block lg:left-1/2"
      >
        <div
          class="bdev1 lg:hidden left-0 px-[2rem] max-w-[28.25rem] flex justify-center mx-auto"
        >
          <PokemonImage id={$data.id} name={$data.name} />
        </div>

        <div
          class="justify-center absolute hidden top-1/2 -translate-y-1/2 lg:flex left-0 w-screen max-w-[120%]"
        >
          <PokemonImage id={$data.id} name={$data.name} />
        </div>
      </div>

      <div
        class="lg:overflow-y-scroll lg:hide-scrollbar lg:inline-block lg:w-[calc(50%-1rem)] relative lg:right-1/2 lg:h-full lg:pr-[2rem]"
      >
        <a href="/" class="hidden lg:block hover:underline">Back</a>
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
