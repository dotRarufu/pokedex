<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

  export let path: string;
  export let label: string;
</script>

<li
  class="py-[0.5rem] flex justify-center w-full transition-colors"
  use:active={{
    path,
    className: "bg-background-300",
    inactiveClassName: "hover:text-text-500 text-primary-300 bg-background-200",
  }}
>
  <a href={path} use:link>{label} </a>
</li>
