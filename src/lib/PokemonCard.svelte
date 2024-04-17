<script lang="ts">
  import { getPokemonImage } from "./helpers";
</script>

<li
  class="shadow-md rounded-[8px] max-w-[11.875rem] aspect-[190/271] flex flex-col justify-between p-[1rem] pt-[1.5rem] bg-primary-500"
>
  <div class="relative">
    <img src="/logo-overlay.png" class="z-[1] opacity-30 absolute" alt="" />
    <img src={getPokemonImage(44)} class="z-[2] relative" alt="bulbasaur" />
    <img
      src={getPokemonImage(44)}
      class="z-[1] brightness-[.4] opacity-50 grayscale absolute left-[4px] top-[4px]"
      alt="bulbasaur"
    />
  </div>
  <div>
    <p class="text-text-50/30">#001</p>
    <p class="capitalize text-h6 text-text-50/50">bulbasaur</p>
  </div>
</li>
