<script lang="ts">
  import BottomNavItem from "./BottomNavItem.svelte";

  export let id: string;
</script>

<nav class="bg-primary-500 rounded-t-[16px] p-[1rem]">
  <ul
    class="divide-x divide-primary-300 flex border border-primary-300 rounded-[16px] overflow-clip"
  >
    <BottomNavItem label="Overview" path="/pokemon/{id}/overview" />
    <BottomNavItem label="Stats" path="/pokemon/{id}/stats" />
    <BottomNavItem label="Abilities" path="/pokemon/{id}/abilities" />
  </ul>
</nav>
