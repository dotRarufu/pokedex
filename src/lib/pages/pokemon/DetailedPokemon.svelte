<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { getPokemonImage } from "../../helpers";
  import pokenode from "../../pokenode";
  import type { Pokemon } from "pokenode-ts";
  import type { PokemonTypes } from "../../types";
  // todo: rename to PokemonTypeChip
  import PokemonType from "../home/PokemonType.svelte";
  import BottomNav from "./BottomNav.svelte";
  import Overview from "./Overview.svelte";
  import Abilities from "./Abilities.svelte";
  import Stats from "./Stats.svelte";
  import Router from "svelte-spa-router";
  import NotFoundDetailedPokemon from "./NotFoundDetailedPokemon.svelte";
  import { readonly, writable } from "svelte/store";

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
</script>

<div class="flex flex-col h-screen">
  <nav class="p-[1rem] pt-[1.5rem] flex items-baseline justify-between">
    <a href="#/">Back</a>

    <div
      class="bdev1 flex border divide-x divide-text-500 border-text-500 rounded-[12px]"
    >
      <a href="#/" class="px-[1rem] py-[0.5rem]">Prev</a>
      <a href="#/" class="px-[1rem] py-[0.5rem]">Next</a>
    </div>
  </nav>

  {#if $data}
    <main class="px-[1rem] h-full overflow-y-scroll py-[2rem]">
      <img src={getPokemonImage($data.id)} class="px-[2rem]" alt={$data.name} />
      <h1 class="mb-[1rem] mt-[1rem] capitalize text-center text-h5">
        {$data.name}
      </h1>
      <Router {routes} prefix={/^\/pokemon\/[0-9]+/} />
    </main>
  {/if}

  {#if $id}
    <BottomNav id={$id.toString()} />
  {/if}
</div>
