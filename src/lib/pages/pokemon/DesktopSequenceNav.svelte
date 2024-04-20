<script lang="ts">
  import { link } from "svelte-spa-router";

  export let id: number;

  $: nextId = id + 1;
  $: previousId = id - 1;
  $: if (previousId === 0) previousId = 1;
</script>

<nav
  class="z-[99999] hidden lg:flex absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-background-200 divide-x border-primary-300 border divide-primary-300 rounded-[12px] shadow-md"
>
  <a
    use:link
    href="/pokemon/{previousId}/overview"
    class="text-primary-300 hover:text-text-500 transition-colors py-[0.25rem] px-[0.75rem]"
    >Previous</a
  >
  <a
    use:link
    href="/pokemon/{nextId}/overview"
    class="text-primary-300 hover:text-text-500 transition-colors py-[0.25rem] px-[0.75rem]"
    >Next</a
  >
</nav>
