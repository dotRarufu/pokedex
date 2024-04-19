<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";
  import { location } from "svelte-spa-router";

  export let path: string;
  export let label: string;
  export let isActive: boolean;
</script>

<li
  class="py-[0.5rem] flex justify-center w-full transition-colors {isActive
    ? 'bg-background-300'
    : 'bg-background-200 hover:text-text-500 text-primary-300 '}"
>
  <!-- use:active={{
    className: "bg-background-300",
    inactiveClassName:
      "hover:text-text-500 text-primary-300 bg-background-200",
  }} -->
  <a href={path} use:link>{label} </a>
</li>
