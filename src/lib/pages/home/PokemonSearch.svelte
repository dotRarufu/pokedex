<script lang="ts">
  export let filter: string | number | null;
</script>

<div class="p-[1rem] lg:px-[5rem] sm:p-[2rem] lg:bg-transparent bg-primary-500">
  <h2 class="text-h6 sm:text-h4 md:max-w-[26.25rem] text-text-950">
    Which Pokémon are you looking for?
  </h2>
  <input
    type="text"
    placeholder="Name or ID"
    bind:value={filter}
    class="mt-[1rem] rounded-[8px] lg:bg-background-200 bg-background-100 px-[1.25rem] py-[0.5rem] w-full max-w-[20.5rem]"
  />
</div>
