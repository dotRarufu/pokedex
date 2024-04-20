<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let src: string;
  export let alt: string;
  export let classNames: string;
  export let hideLoading = false;
  export let hideOnFail = false;
  export let loaderClassNames: string = "";

  let loaded = false;
  let failed = false;
  let loading = false;

  $: if (src) {
    reset();
    loadImage();
  }

  const reset = () => {
    loaded = false;
    failed = false;
    loading = false;
  };

  const loadImage = () => {
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
  };

  onMount(loadImage);
</script>

{#if loaded}
  <img
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    {src}
    class={classNames}
    {alt}
  />
{:else if failed && !hideOnFail}
  <img
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    src="/logo-overlay.png"
    alt="Not Found"
  />
{:else if loading && !hideLoading}
  <img
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    src="/loading.gif"
    class={loaderClassNames}
    alt="Loading..."
  />
{/if}
