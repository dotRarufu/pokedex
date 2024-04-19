<script lang="ts">
  import type { Pokemon, PokemonType } from "pokenode-ts";
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  import pokenode from "../../pokenode";
  import { pokemonTypes, statColors } from "../../pokemonTypes";
  import PokemonTypeChip from "../home/PokemonType.svelte";
  import type { PokemonTypes } from "../../types";
  import { removeDuplicates } from "../../utils";
  import StatItem from "./StatItem.svelte";

  // todo: create getter helper
  const data = getContext<Readable<Pokemon | null>>("pokemonData");

  let strongAgainst: PokemonTypes[] = [];
  let weakAgainst: PokemonTypes[] = [];

  $: if ($data) getStrengthWeaknesses($data.types);

  const getStrengthWeaknesses = async (types: PokemonType[]) => {
    const names = types.map((t) => t.type.name);

    const reqs = names.map(async (n) => {
      const res = await pokenode.getTypeByName(n);

      const doubleDamageFrom = res.damage_relations.double_damage_from.map(
        (t) => t.name,
      );
      const halfDamageFrom = res.damage_relations.half_damage_from.map(
        (t) => t.name,
      );
      const noDamageTo = res.damage_relations.no_damage_to.map((t) => t.name);

      const doubleDamageTo = res.damage_relations.double_damage_to.map(
        (t) => t.name,
      );
      const halfDamageTo = res.damage_relations.half_damage_to.map(
        (t) => t.name,
      );
      const noDamageFrom = res.damage_relations.no_damage_from.map(
        (t) => t.name,
      );

      const weakAgainst = [
        ...doubleDamageFrom,
        // ...halfDamageFrom,
        // ...noDamageTo,
      ];
      const strongAgainst = [
        // ...halfDamageTo,
        ...doubleDamageTo,
        // ...noDamageFrom,
      ];

      return { strongAgainst, weakAgainst };
    });

    const resolved = await Promise.all(reqs);
    const flattenedStrongAgainst = resolved.map((r) => r.strongAgainst).flat();
    const flattenedweakAgainst = resolved.map((r) => r.weakAgainst).flat();

    strongAgainst = removeDuplicates(
      flattenedStrongAgainst,
    ) as unknown as PokemonTypes[];

    weakAgainst = removeDuplicates(
      flattenedweakAgainst,
    ) as unknown as PokemonTypes[];
  };

  $data?.stats[0].stat.name;

  let baseStats: {
    attack: number;
    hp: number;
    defense: number;
    sAttack: number;
    sDefense: number;
    speed: number;
  } = {
    attack: 0,
    defense: 0,
    hp: 0,
    sAttack: 0,
    sDefense: 0,
    speed: 0,
  };

  // $: if ($data)
  //   baseStats = $data.stats.map((s) => ({
  //     name: s.stat.name,
  //     value: s.base_stat,
  //   }));

  $: if ($data)
    baseStats = {
      hp: $data.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
      attack: $data.stats.find((s) => s.stat.name === "attack")?.base_stat || 0,
      defense:
        $data.stats.find((s) => s.stat.name === "defense")?.base_stat || 0,
      sAttack:
        $data.stats.find((s) => s.stat.name === "special-attack")?.base_stat ||
        0,
      sDefense:
        $data.stats.find((s) => s.stat.name === "special-defense")?.base_stat ||
        0,
      speed: $data.stats.find((s) => s.stat.name === "speed")?.base_stat || 0,
    };

  $: console.log("base stats:", baseStats);
</script>

<div class="mx-auto max-w-[45ch] lg:mx-0">
  <p class="text-primary-300">Strong against</p>
  <ul class="mt-[0.5rem] flex gap-[0.5rem] flex-wrap">
    {#each strongAgainst as type, index (index)}
      <PokemonTypeChip isSmall {type} />
    {/each}
  </ul>

  <p class="mt-[2rem] text-primary-300">Weak against</p>
  <ul class="mt-[0.5rem] flex gap-[0.5rem] flex-wrap">
    {#each weakAgainst as type, index (index)}
      <PokemonTypeChip isSmall {type} />
    {/each}
  </ul>

  <ul class="mt-[2rem] flex flex-col gap-[1rem]">
    <StatItem label="HP" hexColor={statColors.hp} value={35} total={255} />
    <StatItem
      label="Attack"
      hexColor={statColors.attack}
      value={baseStats.attack}
      total={190}
    />
    <StatItem
      label="Defense"
      hexColor={statColors.defense}
      value={baseStats.defense}
      total={230}
    />
    <StatItem
      label="S.Attack"
      hexColor={statColors.specialAttack}
      value={baseStats.sAttack}
      total={194}
    />
    <StatItem
      label="S.Defense"
      hexColor={statColors.specialDefense}
      value={baseStats.sDefense}
      total={230}
    />
    <StatItem
      label="Speed"
      hexColor={statColors.speed}
      value={baseStats.speed}
      total={180}
    />
  </ul>
</div>
