<script lang="ts">
  import SortItem from "./SortItem.svelte";

  export let sorter: "name" | "id" | null = null;
</script>

<div class="p-[1rem] sm:p-[2rem] lg:pl-[5rem]">
  <p class="inline text-primary-300 mr-[1rem]">Sort by</p>
  <div class="inline-flex gap-[0.5rem] w-fit">
    <SortItem
      label="Name"
      on:click={() => {
        if (sorter !== "name") sorter = "name";
        else sorter = null;
      }}
      isActive={sorter === "name"}
    />
    <SortItem
      on:click={() => {
        if (sorter !== "id") sorter = "id";
        else sorter = null;
      }}
      label="ID"
      isActive={sorter === "id"}
    />
  </div>
</div>
