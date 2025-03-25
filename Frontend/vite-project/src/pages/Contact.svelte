<script lang="ts"></script>

<main>
  <section class="contact">
    <article class="contact__content">
      <h1 class="contact__title">Kontakta Oss</h1>
      <p class="contact__description">
        Har du några frågor eller funderingar? Tveka inte att kontakta oss via
        informationen nedan eller fyll i kontaktformuläret.
      </p>

      <article class="contact__info">
        <h2 class="contact__info-title">Kontaktuppgifter</h2>
        <ul class="contact__info-list">
          <li class="contact__info-item">
            <p>E-post:</p>
            <a href="mailto:example@example.com">example@example.com</a>
          </li>
          <li class="contact__info-item">
            <p>Telefon:</p>
            <a href="tel:+1234567890">+123 456 7890</a>
          </li>
          <li class="contact__info-item">
            <p>Adress:</p>
            Exempelgatan 123, 123 45 Stad
          </li>
        </ul>
      </article>

      <article class="contact__form">
        <h2 class="contact__form-title">Kontakta Oss Direkt</h2>
        <form>
          <fieldset class="contact__form-group">
            <label for="name">Namn:</label>
            <input type="text" id="name" name="name" required />
          </fieldset>
          <fieldset class="contact__form-group">
            <label for="email">E-post:</label>
            <input type="email" id="email" name="email" required />
          </fieldset>
          <fieldset class="contact__form-group">
            <label for="message">Meddelande:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </fieldset>
          <button type="submit" class="contact__button"> Skicka </button>
        </form>
      </article>
    </article>
  </section>
</main>

<style>
  .contact {
    font-family: Arial, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 20px;
    position: relative;
  }

  .contact::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: var(--primary-color);
    z-index: -1;
  }

  .contact__title {
    font-size: 2.5em;
    margin-bottom: 0.5em;
    color: var(--primary-color);
  }

  .contact__description {
    margin-bottom: 1.5em;
    line-height: 1.6;
  }

  .contact__info {
    margin-bottom: 2em;
  }

  .contact__info-title {
    font-size: 1.75em;
    margin-bottom: 0.5em;
    color: var(--primary-color);
    position: relative;
  }

  .contact__info-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 2px;
    background: var(--accent-color);
  }

  .contact__info-list {
    list-style: none;
    padding: 0;
  }

  .contact__info-item {
    margin-bottom: 0.5em;
    color: var(--text-color);
  }

  .contact__form {
    margin-top: 2em;
  }

  .contact__form-title {
    font-size: 1.75em;
    margin-bottom: 0.5em;
    color: var(--primary-color);
    position: relative;
  }

  .contact__form-title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 2px;
    background: var(--accent-color);
  }
</style>
