<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  export let src: string;
  export let alt: string;
  export let classNames: string;
  export let hideLoading = false;
  export let hideOnFail = false;
  export let loaderClassNames: string = "";
  export let loaderHasOutTransition = true;

  const dispatch = createEventDispatcher();

  let loaded = false;
  let failed = false;
  let loading = false;
  let isErrorEmitted = false;

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
    isErrorEmitted = false;

    img.onload = () => {
      loading = false;
      loaded = true;
    };
    img.onerror = () => {
      loading = false;
      failed = true;
      dispatch("failed");

      if (isErrorEmitted) return;

      isErrorEmitted = true;
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
    out:fade={{ duration: loaderHasOutTransition ? 150 : 0 }}
    src="/loading.gif"
    class={loaderClassNames}
    alt="Loading"
  />
{/if}
