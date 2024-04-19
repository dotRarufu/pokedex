<script lang="ts">
  export let label: string;
  export let value: number;
  export let total: number = 100;
  export let hexColor: string = "#aa0000";

  $: percentage = (value * 100) / total;
</script>

<li class="flex flex-col">
  <p class="text-primary-300">{label || "???"}</p>
  <p class="hidden">{value}</p>
  <div class="h-[12px] relative mt-[0.5rem]">
    <div class="absolute bg-primary-500 h-full w-full rounded-[12px]" />
    <div
      class="absolute h-full rounded-[12px]"
      style="background-color: {hexColor};
      width: {percentage}%"
    />
  </div>
</li>
