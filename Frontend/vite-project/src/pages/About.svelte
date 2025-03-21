<script lang="ts"></script>

<section class="about">
  <article class="about__hero">
    <h1 class="about__hero-title">Om Oss</h1>
    <p class="about__hero-subtitle">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum fugiat
      earum sit suscipit cupiditate ut at delectus, sequi corrupti
      necessitatibus perspiciatis cum. Doloribus, exercitationem nostrum cumque
      velit repellat numquam natus!
    </p>
  </article>
  <article class="about__content">
    <article class="about__content-text">
      <h2 class="about__content-heading">Vår Historia</h2>
      <p class="about__hero-subtitle">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae repellat
        officia velit, accusantium recusandae corporis ab hic cum voluptatem
        facilis. Non nemo ullam magni tempore qui quaerat repellendus harum
        dolore!
      </p>
      <h2 class="about__content-heading">Vårt Team</h2>
      <p class="about__hero-subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quos
        veniam obcaecati eos laborum iure commodi inventore adipisci nisi
        mollitia, rem facilis excepturi voluptatibus quisquam hic aut ducimus
        quae perferendis.
      </p>
    </article>
  </article>
</section>

<style>
  .about {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background-color);
  }

  .about__hero {
    background-color: var(--primary-color);
    color: var(--background-color);
    text-align: center;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .about__hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top left,
      rgba(0, 0, 0, 0.2),
      transparent
    );
    z-index: 1;
  }

  .about__hero-title {
    font-size: 3rem;
    margin: 0;
    position: relative;
    z-index: 2;
  }

  .about__hero-subtitle {
    font-size: 1.5rem;
    margin-top: 1rem;
    position: relative;
    z-index: 2;
  }

  .about__content {
    padding: 3rem 2rem;
    background-color: var(--neutral-color);
    position: relative;
    overflow: hidden;
  }

  .about__content-text {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .about__content::after {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 10px;
    background: var(--secondary-accent-color);
    border-bottom: 1px solid var(--border-color);
    z-index: -1;
  }

  .about__content-heading {
    font-size: 2rem;
    margin-top: 2rem;
    color: var(--primary-color);
  }
</style>
