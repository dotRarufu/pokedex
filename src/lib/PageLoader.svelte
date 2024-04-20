<script lang="ts">
  import { fade } from "svelte/transition";

  export let isLoading: boolean;
</script>

{#if isLoading}
  <div
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    class="bg-primary-500 h-screen w-screen grid place-content-center"
  >
    <img src="/loading.gif" alt="loader" />
  </div>
{/if}
