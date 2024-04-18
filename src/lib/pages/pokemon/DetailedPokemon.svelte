<script lang="ts">
  import { location } from "svelte-spa-router";

  export let params: { id: string } = { id: "" };
</script>

pokemon detailed view | id:
{params.id}
