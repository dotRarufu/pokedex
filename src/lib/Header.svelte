<script>
  import RandomPokemonButton from "./RandomPokemonButton.svelte";

  import DirectionalPad from "./icons/DirectionalPad.svelte";
</script>

<header
  class="z-[3] sticky top-0 left-0 p-[1rem] sm:p-[2rem] lg:bg-transparent bg-primary-400 flex justify-between items-center"
>
  <h1 class="text-background-200 lg:text-text-500 text-h6">Pokédex</h1>

  <ul class="flex gap-[1.5rem] lg:hidden">
    <li>
      <a
        href="#/play"
        class="hover:text-background-100 text-background-200 transition-colors"
      >
        <span class="hidden"> Play a game</span>

        <DirectionalPad classNames="w-[24px]" />
      </a>
    </li>
    <li>
      <RandomPokemonButton />
    </li>
  </ul>
</header>
