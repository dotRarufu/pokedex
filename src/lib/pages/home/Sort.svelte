<script lang="ts">
  import SortItem from "./SortItem.svelte";

  export let sorter: {
    property: "name" | "id";
    direction: "up" | "down";
  } | null = null;
  $: console.log("sorter:", sorter);

  const handleItemClick = (property: "name" | "id") => () => {
    if (sorter === null) {
      sorter = { property, direction: "down" };
      return;
    }

    if (sorter.direction === "down") {
      sorter.direction = "up";

      return;
    }

    if (sorter.direction === "up") sorter = null;
    else sorter = null;
  };
</script>

<div class="p-[1rem] sm:p-[2rem] lg:pl-[5rem]">
  <p class="inline text-primary-300 mr-[1rem]">Sort by</p>
  <div class="inline-flex gap-[0.5rem] w-fit">
    <SortItem
      label="Name"
      on:click={handleItemClick("name")}
      isActive={sorter?.property === "name"}
      direction={sorter?.direction}
    />
    <SortItem
      on:click={handleItemClick("id")}
      label="ID"
      isActive={sorter?.property === "id"}
      direction={sorter?.direction}
    />
  </div>
</div>
