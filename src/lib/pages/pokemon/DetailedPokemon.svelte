<script lang="ts">
  import { setContext } from "svelte";
  import pokenode from "../../pokenode";
  import type { Pokemon } from "pokenode-ts";
  // todo: rename to PokemonTypeChip
  import Overview from "./Overview.svelte";
  import Abilities from "./Abilities.svelte";
  import Stats from "./Stats.svelte";
  import Router, { link, push } from "svelte-spa-router";
  import NotFoundDetailedPokemon from "./NotFoundDetailedPokemon.svelte";
  import { readonly, writable } from "svelte/store";
  import PokemonImage from "../../PokemonImage.svelte";
  import TopNav from "./TopNav.svelte";
  import Nav from "./Nav.svelte";
  import DesktopBackground from "./DesktopBackground.svelte";
  import TabletBackground from "./TabletBackground.svelte";
  import MobileBackground from "./MobileBackground.svelte";
  import DesktopSequenceNav from "./DesktopSequenceNav.svelte";
  import PageLoader from "../../PageLoader.svelte";
  import { fade } from "svelte/transition";
  import { addPadding } from "../../helpers";

  export let params: { id: string } = { id: "" };

  const id = writable<number | null>(null);
  const data = writable<Pokemon | null>(null);

  $: $id = Number(params.id);
  $: if ($id) getData($id);

  // Only 3 digits
  $: if ($id && $id > 999) push("/");

  // or get data from cache
  const getData = async (id: number) => {
    $data = await pokenode.getPokemonById(id);
  };

  // Bring up loader on $id change
  $: if ($id) {
    $data = null;
  }

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

  let initialLoadingDone = false;
  let isLoading = true;

  const routeLoading = (event: any) => {
    if (initialLoadingDone) return;
    isLoading = true;
  };

  const routeLoaded = (event: any) => {
    isLoading = false;
    initialLoadingDone = true;
  };
</script>

<svelte:window bind:innerWidth={windowWidth} />

<PageLoader {isLoading} />

{#if $data}
  <div
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    class="h-screen flex flex-col overflow-clip sm:bg-primary-500 bg-background-100 lg:p-[3.25rem]"
  >
    {#if !isDesktop}
      <TopNav id={$data.id || 1} />
    {/if}

    <main
      class="hover:show-scrollbar hide-scrollbar h-full overflow-y-scroll lg:overflow-visible sm:rounded-[16px] px-[1rem] py-[2rem] sm:mx-auto sm:my-[2rem] lg:mb-0 sm:h-fit sm:max-w-[43.125rem] sm:bg-background-100 sm:p-[3.25rem] lg:w-full lg:max-w-[78.125rem] lg:h-full relative lg:max-h-[42.0625rem] sm:shadow-xl
      "
    >
      <MobileBackground />
      <TabletBackground />
      <DesktopBackground />
      <DesktopSequenceNav id={$data.id} />

      <div
        class="relative z-[1] lg:h-full lg:w-[calc(50%-1rem)] lg:inline-block lg:left-1/2"
      >
        <div
          class="lg:hidden aspect-square left-0 px-[2rem] max-w-[28.25rem] flex justify-center mx-auto"
        >
          <PokemonImage id={$data.id} name={$data.name} />
        </div>

        <div
          class="justify-center absolute hidden top-1/2 -translate-y-1/2 lg:flex left-0 w-screen max-w-[120%] aspect-square items-center"
        >
          <PokemonImage id={$data.id} name={$data.name} />
        </div>
      </div>

      <div
        class="lg:overflow-y-scroll lg:hide-scrollbar lg:inline-block lg:w-[calc(50%-1rem)] relative lg:right-1/2 lg:h-full lg:pr-[2rem]"
      >
        <a
          href="/"
          use:link
          class="hidden text-primary-500 lg:block hover:underline hover:text-text-500 transition-colors"
          >Back</a
        >

        <div
          class="sm:flex sm:flex-col sm:items-center mx-auto max-w-[45ch] lg:items-start lg:mx-0 lg:mb-0 my-[1.5rem] lg:flex-col-reverse"
        >
          <p class="text-primary-300">
            #{addPadding($data.id + "", 3, "0")}
          </p>
          <h1
            class=" w-fit lg:text-start lg:text-h3 capitalize text-center text-h5"
          >
            {$data.name}
          </h1>
        </div>

        {#if $id && isTablet}
          <Nav id={$id.toString()} />
        {/if}

        <Router
          {routes}
          prefix={/^\/pokemon\/[0-9]+/}
          on:routeLoading={routeLoading}
          on:routeLoaded={routeLoaded}
        />
      </div>
    </main>

    {#if $id && !isTablet}
      <Nav id={$id.toString()} />
    {/if}
  </div>
{:else}
  <PageLoader isLoading />
{/if}
