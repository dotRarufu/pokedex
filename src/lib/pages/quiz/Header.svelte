<script lang="ts">
  import { link } from "svelte-spa-router";

  export let score: number;
</script>

<header
  class=" bg-primary-400 flex items-baseline justify-between p-[1rem] sm:p-[2rem] text-background-200"
>
  <a href="/" use:link class="hover:underline">Back</a>

  <p class="flex items-center gap-[0.5rem] font-bold">
    {Math.round(score)}

    <img src="/rare-candy.png" class="w-[1.5rem]" alt="rare candy" />
  </p>
</header>
