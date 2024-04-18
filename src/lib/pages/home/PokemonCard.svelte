<script lang="ts">
  import { addPadding, getPokemonImage } from "../../helpers";
  import type { IPokemonCard } from "../../types";

  export let data: IPokemonCard;
  const { name, id } = data;
</script>

<!-- todo: colorized background (based on type) on hover -->
<li
  class="shadow-md rounded-[8px] max-w-[11.875rem] aspect-[190/271] flex flex-col justify-between p-[1rem] pt-[1.5rem] bg-primary-500"
>
  <a class=" bdev1 relative" href="#/pokemon/{id}">
    <img src="/logo-overlay.png" class="z-[1] opacity-30 absolute" alt="" />
    <img src={getPokemonImage(id)} class="z-[2] relative" alt={name} />
    <img
      src={getPokemonImage(id)}
      class="z-[1] brightness-[.4] opacity-50 grayscale absolute left-[4px] top-[4px]"
      alt={name}
    />
  </a>
  <div>
    <p class="text-primary-300">#{addPadding(id.toString(), 3, "0")}</p>
    <p class="capitalize text-h6 text-primary-400">{name}</p>
  </div>
</li>
