<script lang="ts">
  import { getPokemonImage } from "./helpers";

  export let id: number;
  export let name: string;
</script>

<div class="relative">
  <img src={getPokemonImage(id)} class="z-[2] relative" alt={name} />
  <img
    src={getPokemonImage(id)}
    class="z-[1] brightness-[.4] opacity-50 grayscale absolute left-[4px] top-[4px]"
    alt={name}
  />
</div>
