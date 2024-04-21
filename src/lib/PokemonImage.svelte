<script lang="ts">
  import Image from "./Image.svelte";
  import { getPokemonImage } from "./helpers";

  export let id: number;
  export let name: string;
  export let classNames: string = "";
</script>

<div class="relative">
  <Image
    on:failed
    src={getPokemonImage(id)}
    classNames="z-[2] relative {classNames}"
    alt={name}
  />
  <Image
    hideOnFail
    src={getPokemonImage(id)}
    classNames="z-[1] brightness-[.4] opacity-50 grayscale absolute left-[4px] top-[4px] {classNames}"
    alt={name}
    hideLoading
  />
</div>
