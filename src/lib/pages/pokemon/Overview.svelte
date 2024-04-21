<script lang="ts">
  import { getContext } from "svelte";
  import pokenode from "../../pokenode";
  import type { Readable } from "svelte/store";
  import type { PokemonTypes } from "../../types";
  import type { Pokemon } from "pokenode-ts";
  import {
    cleanText,
    decimeterToFoot,
    hectogramToKilogram,
  } from "../../helpers";
  import PokemonType from "../home/PokemonType.svelte";
  import OverviewLoader from "./OverviewLoader.svelte";

  // todo: create getter helper

  const data = getContext<Readable<Pokemon | null>>("pokemonData");

  let flavorText = "";
  let pokemonTypes: PokemonTypes[] = [];

  let height: number | null = null;
  let weight: number | null = null;

  $: if ($data) {
    // bring up the loader
    height = null;
    weight = null;

    getSpecies($data);
  }

  const getSpecies = async (data: Pokemon) => {
    const { flavor_text_entries } = await pokenode.getPokemonSpeciesById(
      data.id,
    );
    const english = flavor_text_entries.find(
      (f) => f.language.name === "en",
    )!.flavor_text;

    height = data.height;
    weight = data.weight;

    const cleaned = cleanText(english);

    flavorText = cleaned;

    pokemonTypes = data.types.map((t) => t.type.name as PokemonTypes);
  };
</script>

{#if height && weight && flavorText && pokemonTypes}
  <div class="mx-auto max-w-[45ch] lg:mx-0">
    <ul class="flex gap-[1rem]">
      {#each pokemonTypes as pokemonType (pokemonType)}
        <PokemonType isSmall type={pokemonType} />
      {/each}
    </ul>

    <p class="mt-[1rem] normal-case leading-[1.5]">{flavorText}</p>

    <p class="mt-[1rem] normal-case leading-[1.5]">
      Stands at roughly {decimeterToFoot(height)} feet tall and weighs approximately
      {hectogramToKilogram(weight)} kilograms
    </p>
  </div>
{:else}
  <OverviewLoader />
{/if}
