<script lang="ts">
  import { link } from "svelte-spa-router";

  export let path: string;
  export let label: string;
  export let isActive: boolean;
</script>

<li class="w-full">
  <a
    href={path}
    use:link
    class="py-[0.5rem] flex justify-center w-full transition-colors {isActive
      ? 'bg-background-300'
      : 'bg-background-200 hover:text-text-500 text-primary-300 '}"
    use:link
    >{label}
  </a>
</li>
