<script lang="ts">
  import type { Pokemon } from "pokenode-ts";
  import PokemonImage from "../../PokemonImage.svelte";
  import {
    capitalizeSentences,
    cleanText,
    getLocalstorage,
    getMaxPokemonId,
    getRandomNumberInRange,
    updateLocalstorage,
  } from "../../helpers";
  import pokenode from "../../pokenode";
  import Header from "./Header.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Input from "./Input.svelte";

  // todo: make data reactive
  let data = writable<Pokemon | null>(null);

  let flavorText = "";
  let isColorized = false;
  let multiplier: 2 | 1 = 2;
  let inputValue = "";
  let score = getLocalstorage().score;
  let maxId = 0;
  let isErrorEmitted = false;

  // todo: add loader
  const initialize = async () => {
    try {
      // max is 905
      const id = await getRandomNumberInRange(1, maxId);
      $data = await pokenode.getPokemonById(id);
      // shivyam have up to 905

      const species = await pokenode.getPokemonSpeciesById(id);

      const hasEnglish = species.flavor_text_entries.find(
        (f) => f.language.name === "en",
      );
      const fallback = species.flavor_text_entries[0].flavor_text;

      const raw = hasEnglish?.flavor_text || fallback;
      const cleaned = cleanText(raw);
      const removedHint = cleaned
        .toLowerCase()
        .replace($data.name, "this pokemon");

      flavorText = capitalizeSentences(removedHint);
    } catch {
      // retry

      clear();
      initialize();
    }
  };

  onMount(async () => {
    maxId = await getMaxPokemonId();

    await initialize();
  });

  const handleHintClick = () => {
    isColorized = true;
    multiplier = 1;
  };

  const handleGuessClick = () => {
    if (!$data || !inputValue) return;

    // todo: flash image for a while after
    const isCorrect =
      inputValue === $data.name || inputValue === $data.id.toString();

    if (isCorrect) {
      score += 1 * multiplier;
      updateLocalstorage({ score });
    }

    clear();
    initialize();
  };

  const clear = () => {
    // todo: add timeout for smooth change, for while loading and retrying
    multiplier = 2;
    isColorized = false;
    inputValue = "";

    isErrorEmitted = false;

    // initialize();
  };

  // todo: check if pokemon's name in description, then remove it

  $: isMd = windowWidth > 639;
  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<!-- idea: can add pp, limit amount of tries -->

<div class="h-screen w-screen absolute left-0 -z-[1] top-0 bg-primary-500" />

{#if !isMd}
  <Header {score} />
{/if}

{#if $data && flavorText}
  <main
    class="overflow-clip shadow-lg sm:w-[26.875rem] mx-auto sm:rounded-[16px] sm:max-h-[53.75rem] sm:absolute sm:top-1/2 sm:-translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 bg-background-100 h-[calc(100vh-3.5rem)] flex flex-col"
  >
    {#if isMd}
      <Header {score} />
    {/if}

    <div
      class="overflow-y-auto overflow-x-clip h-full py-[1.75rem] px-[1rem] flex flex-col gap-[1.75rem] sm:p-[2rem]"
    >
      <div class="w-fit mx-auto">
        <PokemonImage
          on:failed={() => {
            if (isErrorEmitted) return;
            isErrorEmitted = true;
            clear();
            initialize();
          }}
          id={$data.id}
          name=""
          classNames="px-[1rem] py-[1rem] max-w-[22.875rem] transition-all {!isColorized
            ? 'brightness-0'
            : ''}"
        />
      </div>

      <h1 class="text-h6 font-bold mx-auto">Who's that Pokemon?</h1>
      <p class="leading-[1.5] max-w-[40ch] mx-auto">
        {flavorText}
      </p>
    </div>

    <div class="w-full p-[1rem] sm:p-[2rem] h-fit">
      <button
        on:click={handleHintClick}
        class="mb-[1rem] text-primary-300 hover:underline hover:text-text-500"
      >
        I need more hint
      </button>
      <Input on:click={handleGuessClick} bind:value={inputValue} />
    </div>
  </main>
{/if}
