<script lang="ts">
  import Image from "./Image.svelte";
  import { getPokemonImage } from "./helpers";

  export let id: number;
  export let name: string;
  export let classNames: string = "";
  export let loaderClassNames: string = "";
</script>

{#key id}
  <div class="relative">
    <Image
      on:failed
      src={getPokemonImage(id)}
      classNames="z-[2] relative {classNames}"
      alt={name}
      loaderHasOutTransition={false}
      {loaderClassNames}
    />
    <Image
      hideOnFail
      hideLoading
      src={getPokemonImage(id)}
      classNames="z-[1] brightness-0 opacity-50 absolute left-[4px] top-[4px] {classNames}"
      alt={name}
    />
  </div>
{/key}
