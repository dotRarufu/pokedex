<script lang="ts">
  import { getContext } from "svelte";
  import pokenode from "../../pokenode";
  import type { Readable } from "svelte/store";
  import type { PokemonTypes } from "../../types";
  import type { Pokemon } from "pokenode-ts";
  import { decimeterToFoot, hectogramToKilogram } from "../../helpers";
  import PokemonType from "../home/PokemonType.svelte";

  // todo: create getter helper

  const data = getContext<Readable<Pokemon | null>>("pokemonData");

  let flavorText = "";
  let pokemonTypes: PokemonTypes[] = [];

  $: height = $data?.height || null;
  $: weight = $data?.weight || null;
  $: if ($data) getSpecies($data);

  const getSpecies = async (data: Pokemon) => {
    const { flavor_text_entries } = await pokenode.getPokemonSpeciesById(
      data.id,
    );
    const english = flavor_text_entries.find(
      (f) => f.language.name === "en",
    )!.flavor_text;

    flavorText = english;
    pokemonTypes = data.types.map((t) => t.type.name as PokemonTypes);
  };
</script>

<div class="mx-auto max-w-[45ch] lg:mx-0">
  <ul class="flex gap-[1rem]">
    {#each pokemonTypes as pokemonType (pokemonType)}
      <PokemonType isSmall type={pokemonType} />
    {/each}
  </ul>

  <p class="mt-[1rem] normal-case leading-[1.5]">{flavorText}</p>

  {#if height && weight}
    <p class="mt-[1rem] normal-case leading-[1.5]">
      Stands at roughly {decimeterToFoot(height)} feet tall and weighs approximately
      {hectogramToKilogram(weight)} kilograms
    </p>
  {/if}
</div>
