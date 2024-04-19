<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import { getContext } from "svelte";

  import type { Readable } from "svelte/store";
  import { pokemonTypeColors } from "../../pokemonTypes";
  import MoveItem from "./MoveItem.svelte";
  import pokenode, { moveClient } from "../../pokenode";
  import type { PokemonTypes } from "../../types";

  // todo: create getter helper
  const data = getContext<Readable<Pokemon | null>>("pokemonData");

  let movesWithDescription: {
    name: string;
    description: string;
    color: string;
  }[] = [];

  $: if ($data) getMoves($data.moves.map((m) => m.move.name));

  const getMoves = async (moves: string[]) => {
    const reqs = moves.map(async (a) => {
      const res = await moveClient.getMoveByName(a);
      const match = res.flavor_text_entries.filter(
        (f) => f.language.name === "en",
      );

      const english = match.length > 0 ? match[0].flavor_text : "???";

      const color = pokemonTypeColors[res.type.name as PokemonTypes];

      return { name: res.name, description: english, color };
    });

    const resolved = await Promise.all(reqs);

    movesWithDescription = resolved;
  };
</script>

<div class="mx-auto max-w-[45ch] lg:mx-0">
  <!-- todo: put in 2 column grid -->
  <ul class="flex flex-col gap-[1.5rem]">
    {#each movesWithDescription as move (move)}
      <MoveItem
        description={move.description}
        color={move.color}
        move={move.name}
      />
    {/each}
  </ul>
</div>
