<script lang="ts">
  import ArrowUp from "../../icons/ArrowUp.svelte";

  export let label: string;
  export let isActive: boolean = false;
  export let direction: "up" | "down" | undefined;
</script>

<button
  on:click
  class="flex py-[0.25rem] px-[0.5rem] items-center gap-[0.5rem] transition-colors border border-primary-200 rounded-[12px] {isActive
    ? 'text-background-100 font-bold bg-primary-500'
    : 'text-primary-300'}"
  >{label}
  {#if direction !== undefined && isActive}
    <ArrowUp
      classNames="{direction === 'down'
        ? 'rotate-[180deg]'
        : ''} w-[1.5rem] h-fit aspect-square"
    />
  {:else}
    <div class=" w-[1.5rem] aspect-square grid place-content-center">—</div>
  {/if}
</button>
