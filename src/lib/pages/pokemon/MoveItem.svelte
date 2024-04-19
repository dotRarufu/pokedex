<script lang="ts">
  export let color: string;
  export let move: string;
  export let description: string;
</script>

<li class="">
  <button
    class="relative py-[0.5rem] rounded-[12px] w-fit px-[1rem] sm:text-h6"
    style="background-color: {color};"
  >
    <span class="text-background-100 relative z-[2] capitalize">
      {move}
      <span
        class="-z-[1] opacity-30 absolute left-[1px] text-text-500 top-[1px] capitalize"
      >
        {move}
      </span>
    </span>
  </button>

  <p class="text-primary-500 mt-[0.5rem] leading-[1.5]">{description}</p>
</li>
