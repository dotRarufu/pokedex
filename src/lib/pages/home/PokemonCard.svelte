<script lang="ts">
  import { link } from "svelte-spa-router";
  import Image from "../../Image.svelte";
  import { addPadding, getPokemonImage } from "../../helpers";
  import type { IPokemonCard } from "../../types";

  export let data: IPokemonCard;
  const { name, id } = data;
</script>

<!-- todo: colorized background (based on type) on hover -->
<li
  class="shadow-md rounded-[8px] w-[11.875rem] h-[16.9375rem] aspect-[190/271] flex flex-col justify-between p-[1rem] pt-[1.5rem] bg-primary-500"
>
  <a class="relative" use:link href="/pokemon/{id}/overview">
    <img src="/logo-overlay.png" class="z-[1] opacity-30 absolute" alt="" />
    <Image
      src={getPokemonImage(id)}
      classNames="z-[2] relative"
      alt="an image of {name}"
      loaderClassNames="relative top-[1.25rem] "
    />
    <Image
      hideOnFail
      src={getPokemonImage(id)}
      classNames="z-[1] brightness-0 opacity-50 absolute left-[4px] top-[4px]"
      hideLoading
      alt="an image of {name} in grayscale"
    />
  </a>
  <a use:link href="/pokemon/{id}/overview">
    <p class="text-primary-300">#{addPadding(id.toString(), 3, "0")}</p>
    <p class="capitalize text-h6 text-primary-400">{name}</p>
  </a>
</li>
