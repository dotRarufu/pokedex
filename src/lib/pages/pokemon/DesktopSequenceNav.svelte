<script lang="ts">
  export let id: number;

  let nextId = id + 1;
  let previousId = id === 0 ? 1 : id - 1;
</script>

<nav
  class="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 bg-background-200 flex divide-x border-primary-300 border divide-primary-300 rounded-[12px] shadow-md"
>
  <a
    href="#/pokemon/{previousId}/overview"
    class="text-primary-300 hover:text-text-500 transition-colors py-[0.25rem] px-[0.75rem]"
    >Previous</a
  >
  <a
    href="#/pokemon/{nextId}/overview"
    class="text-primary-300 hover:text-text-500 transition-colors py-[0.25rem] px-[0.75rem]"
    >Next</a
  >
</nav>
