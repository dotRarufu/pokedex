<script lang="ts">
  import { getRandomNumberInRange } from "./helpers";
  import { link } from "svelte-spa-router";
  import DirectionalPad from "./icons/DirectionalPad.svelte";

  // assessment only require up to 3 digits
  const randomNumber = getRandomNumberInRange(1, 999);
</script>

<a
  href="/quiz"
  use:link
  class="hover:text-background-100 text-background-200 transition-colors lg:flex items-center gap-[1rem] lg:hover:text-text-500 lg:text-primary-300"
>
  <DirectionalPad classNames="w-[24px]" />
  <span class="hidden lg:block"> Play a quiz game </span>
</a>
