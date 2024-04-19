<script lang="ts">
  import { onMount } from "svelte";
  export let src: string;
  export let alt: string;
  export let classNames: string;
  export let hideLoading = false;

  let loaded = false;
  let failed = false;
  let loading = false;

  onMount(() => {
    const img = new Image();
    img.src = src;
    loading = true;

    img.onload = () => {
      loading = false;
      loaded = true;
    };
    img.onerror = () => {
      loading = false;
      failed = true;
    };
  });
</script>

{#if loaded}
  <img {src} class={classNames} {alt} />
{:else if failed}
  <img src="/logo-overlay.png" alt="Not Found" />
{:else if loading && !hideLoading}
  <img src="/loading.gif" alt="Loading..." />
{/if}
