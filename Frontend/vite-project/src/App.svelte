<script lang="ts">
  import Header from "./components/header.svelte";
  import Router from "./routing/router.svelte";
  import Footer from "./components/footer.svelte";

  const components = [Header, Router, Footer];

  let visibility = $state(components.map(() => false));

  $effect(() => {
    components.forEach((_, index) => {
      setTimeout(() => {
        visibility[index] = true;
      }, index * 700);
    });
  });
</script>

<main>
  {#each components as Component, index (index)}
    <section
      class="component-container"
      class:scale-up={visibility[index]}
      style="animation-delay: {index * 0.7}s; transform-origin: center;"
    >
      <Component />
    </section>
  {/each}
</main>

<style>
  .component-container {
    opacity: 0;
    transform: scale(0.8) translateY(50px);
    transform-origin: center;
  }

  .scale-up {
    animation: fadeIn 1s ease-out forwards;
  }

  @keyframes fadeIn {
    0% {
      transform: scale(0.8) translateY(50px);
      opacity: 0;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
</style>
