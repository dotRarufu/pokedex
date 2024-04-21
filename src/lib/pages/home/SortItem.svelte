<script lang="ts">
  export let label: string;
  export let isActive: boolean = false;
</script>

<button
  on:click
  class=" p-[0.5rem] transition-colors rounded-[12px] {isActive
    ? 'text-background-100 font-bold bg-primary-500'
    : 'text-primary-300'}">{label}</button
>
