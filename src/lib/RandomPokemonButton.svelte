<script lang="ts">
  import { onMount } from "svelte";
  import { getMaxPokemonId, getRandomNumberInRange } from "./helpers";
  import Dice from "./icons/Dice.svelte";
  import { link } from "svelte-spa-router";

  // assessment only require up to 3 digits
  const randomNumber = getRandomNumberInRange(1, 999);
</script>

<a
  href="/pokemon/{randomNumber}/overview"
  use:link
  class="hover:text-background-100 text-background-200 transition-colors lg:flex items-center gap-[1rem] lg:hover:text-text-500 lg:text-primary-300"
>
  <Dice classNames="w-[24px]" />
  <span class="hidden lg:block"> Random pokemon </span>
</a>
