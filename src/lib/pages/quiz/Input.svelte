<script lang="ts">
  export let value: string;
</script>

<div
  class="flex rounded-[12px] overflow-clip divide-x divide-primary-400 border border-primary-400"
>
  <input
    type="text"
    bind:value
    class="bg-primary-500 placeholder:text-primary-300 text-text-500 px-[1rem] w-full py-[0.75rem]"
    placeholder="Name or ID"
  />
  <button
    on:click
    class=" bdev1 bg-primary-500 w-fit px-[1rem] py-[0.75rem] hover:text-text-500 text-primary-300 transition-colors hover:bg-background-200"
    >Guess</button
  >
</div>
