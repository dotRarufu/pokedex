<script lang="ts">
  export let id: number;

  $: nextId = id + 1;
  $: previousId = id - 1;
  $: if (previousId === 0) previousId = 1;
</script>

<nav
  class="sm:px-[2rem] bg-primary-400 p-[1rem] sm:py-[1rem] pt-[1.5rem] flex items-baseline justify-between"
>
  <a
    href="#/"
    class="hover:text-background-200 text-primary-300 transition-colors">Back</a
  >

  <div
    class="flex border divide-x divide-primary-300 border-primary-300 rounded-[12px]"
  >
    <a
      href="#/pokemon/{previousId}/overview"
      class="px-[1rem] py-[0.5rem] hover:text-background-200 text-primary-300 transition-colors"
      >Prev</a
    >
    <a
      href="#/pokemon/{nextId}/overview"
      class="hover:text-background-200 text-primary-300 transition-colors px-[1rem] py-[0.5rem]"
      >Next</a
    >
  </div>
</nav>
