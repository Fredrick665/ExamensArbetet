<script lang="ts">
  import bild1 from "../assets/bild1.jpeg";
  import bild2 from "../assets/bild2.jpeg";
  import bild3 from "../assets/bild3.jpeg";
  import bild4 from "../assets/bild4.jpeg";

  const images = [bild1, bild2, bild3, bild4];

  let currentImageIndex = $state(0);
  let animationClass = $state("fade-in");

  $effect(() => {
    const intervalId = setInterval(() => {
      animationClass = "fade-out";
      setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        animationClass = "fade-in";
      }, 800);
    }, 3000);

    return () => clearInterval(intervalId);
  });
</script>

<main>
  <section class="imagecycler">
    <img
      class="imagecycler__image {animationClass}"
      src={images[currentImageIndex]}
      alt="Fransvård"
    />
  </section>
</main>

<style>
  .imagecycler {
    position: relative;
    width: 500px;
    height: 300px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to bottom, #000000, #1a1a1a);
  }

  .imagecycler__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  .fade-in {
    animation: fadeInZoom 1s ease-in-out forwards;
  }

  .fade-out {
    animation: fadeOutZoom 0.8s ease-in-out forwards;
  }

  @keyframes fadeInZoom {
    0% {
      opacity: 0;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutZoom {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }
</style>
