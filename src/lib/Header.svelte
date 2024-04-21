<script>
  import RandomPokemonButton from "./RandomPokemonButton.svelte";

  import PlayButton from "./PlayButton.svelte";
</script>

<header
  class="z-[3] sticky top-0 left-0 p-[1rem] sm:p-[2rem] lg:bg-transparent bg-primary-400 flex justify-between items-center"
>
  <h1 class="text-background-200 lg:text-text-500 text-h6">
    Pokédex <span class="text-[1rem] text-primary-200"
      >by <a
        href="https://github.com/dotRarufu/"
        target="_blank"
        class="hover:underline">dotRarufu</a
      ></span
    >
  </h1>

  <ul class="flex gap-[1.5rem] lg:hidden">
    <li>
      <PlayButton />
    </li>
    <li>
      <RandomPokemonButton />
    </li>
  </ul>
</header>
