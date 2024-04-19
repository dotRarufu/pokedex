<script lang="ts">
  import BottomNavItem from "./BottomNavItem.svelte";

  export let id: string;
</script>

<nav
  class="lg:mx-0 bg-primary-500 sm:p-0 sm:max-w-[20.75rem] rounded-t-[16px] sm:mx-auto sm:my-[1.5rem] p-[1rem] sm:bg-transparent lg:bg-background-100 lg:sticky top-0 lg:z-[3] lg:rounded-none"
>
  <ul
    class="divide-x divide-primary-300 flex border border-primary-300 rounded-[16px] lg:rounded-[12px] overflow-clip"
  >
    <BottomNavItem label="Overview" path="/pokemon/{id}/overview" />
    <BottomNavItem label="Stats" path="/pokemon/{id}/stats" />
    <BottomNavItem label="Abilities" path="/pokemon/{id}/abilities" />
  </ul>
</nav>
