<script lang="ts">
  import ImageCycler from "../utils/ImageCycler.svelte";
</script>

<main class="homepage">
  <section class="homepage__hero">
    <h1 class="homepage__hero-title">Välkommen till Malins Fransar</h1>
    <p class="homepage__hero-subtitle">
      Din expert på fransförlängning och fransvård
    </p>
  </section>
  <section class="homepage__featured-services">
    <h2 class="homepage__section-title">Våra Populäraste Tjänster</h2>
    <ul class="homepage__service-list">
      <li class="homepage__service-item">
        <h3 class="homepage__service-item-title">Fransförlängning</h3>
        <p class="homepage__service-item-description">
          Få långa och fylliga fransar med vår professionella fransförlängning.
        </p>
      </li>
      <li class="homepage__service-item">
        <h3 class="homepage__service-item-title">Fransböjning</h3>
        <p class="homepage__service-item-description">
          Naturlig böjning för att framhäva dina egna fransar.
        </p>
      </li>
      <li class="homepage__service-item">
        <h3 class="homepage__service-item-title">Fransfärgning</h3>
        <p class="homepage__service-item-description">
          Intensifiera din blick med våra skonsamma fransfärger.
        </p>
      </li>
    </ul>
  </section>
  <ImageCycler />
</main>

<style>
  .homepage {
    padding: 20px;
    background-color: var(--background-color);
    color: var(--text-color);
    position: relative;
    overflow: hidden;
  }

  .homepage__hero {
    text-align: center;
    padding: 50px 20px;
    background-color: var(--primary-color);
    color: var(--background-color);
    position: relative;
    overflow: hidden;
  }

  .homepage__hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      135deg,
      var(--accent-color) 25%,
      transparent 25%,
      transparent 50%,
      var(--accent-color) 50%,
      var(--accent-color) 75%,
      transparent 75%,
      transparent
    );
    background-size: 56px 56px;
    opacity: 0.2;
    z-index: 0;
  }

  .homepage__hero-title {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
    position: relative;
    z-index: 1;
  }

  .homepage__hero-subtitle {
    font-size: 1.25rem;
    color: var(--neutral-color);
    position: relative;
    z-index: 1;
  }

  .homepage__featured-services {
    padding: 50px 20px;
    background-color: var(--neutral-color);
    position: relative;
  }

  .homepage__featured-services::before {
    content: "";
    position: absolute;
    top: -20px;
    right: -20px;
    width: 150px;
    height: 150px;
    background-color: var(--accent-color);
    border-radius: 50%;
    opacity: 0.3;
    z-index: 0;
  }

  .homepage__section-title {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: var(--primary-color);
    position: relative;
    z-index: 1;
  }

  .homepage__service-list {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 1;
  }

  .homepage__service-item {
    width: 30%;
    text-align: center;
    background-color: var(--background-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .homepage__service-item::before,
  .homepage__service-item::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }

  .homepage__service-item::before {
    border: 2px solid var(--secondary-accent-color);
    transform: scale(1.05);
  }

  .homepage__service-item::after {
    border: 2px solid var(--accent-color);
    transform: scale(1.1);
    opacity: 0;
  }

  .homepage__service-item:hover::before {
    transform: scale(1.15);
  }

  .homepage__service-item:hover::after {
    transform: scale(1.25);
    opacity: 1;
  }
</style>
