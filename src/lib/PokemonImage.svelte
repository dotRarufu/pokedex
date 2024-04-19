<script lang="ts">
  import Image from "./Image.svelte";
  import { getPokemonImage } from "./helpers";

  export let id: number;
  export let name: string;
</script>

<div class="relative">
  <Image src={getPokemonImage(id)} classNames="z-[2] relative" alt={name} />
  <Image
    src={getPokemonImage(id)}
    classNames="z-[1] brightness-[.4] opacity-50 grayscale absolute left-[4px] top-[4px]"
    alt={name}
    hideLoading
  />
</div>
