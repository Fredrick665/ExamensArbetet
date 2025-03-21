<script lang="ts">
  import { push } from "svelte-spa-router";
  let username = $state<string>("");
  let password = $state<string>("");
  let message = $state<string>("");
  let role = $state("user");

  async function registerUser(event: Event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        message = "Registrering lyckades!";
        setTimeout(() => {
          push("/");
        }, 2000);
      } else {
        message = data.message || "Registrering misslyckades.";
      }
    } catch (error) {
      console.error("Fel vid registrering:", error);
      message = "Ett fel uppstod under registreringen.";
    }
  }
</script>

<section class="signup">
  <header class="signup__header">
    <h1 class="signup__title">Registrera dig!</h1>
  </header>

  <form class="signup__form" onsubmit={registerUser}>
    <input
      type="text"
      placeholder="Användarnamn"
      bind:value={username}
      class="signup__input"
    />
    <input
      type="password"
      placeholder="Lösenord"
      bind:value={password}
      class="signup__input"
    />
    <button type="submit" class="signup__button">Registrera dig!</button>
  </form>

  {#if message}
    <p>{message}</p>
  {/if}
</section>

<style>
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scaleUp {
    0% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes buttonHover {
    0% {
      background-color: var(--primary-color);
      transform: scale(1);
      box-shadow: none;
    }
    100% {
      background-color: var(--accent-color);
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    position: relative;
    z-index: 1;
    animation: fadeIn 1s ease-out;
  }

  .signup__header {
    z-index: 3;
    margin-bottom: 15px;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s;
  }

  .signup__title {
    font-size: 2.5rem;
    color: var(--button-text-color);
    position: relative;
    z-index: 3;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 0.5s;
  }

  .signup__title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 5px;
    width: 100%;
    background: var(--primary-color);
    border-radius: 2px;
  }

  .signup__form {
    display: flex;
    flex-direction: column;
    width: 320px;
    z-index: 3;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 1s;
  }

  .signup__input {
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    position: relative;
    box-sizing: border-box;
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease;
    z-index: 3;
    animation: scaleUp 0.3s ease-out forwards;
    animation-delay: 1.2s;
  }

  .signup__input:hover,
  .signup__input:focus {
    background-color: var(--secondary-accent-color);
    border-color: var(--primary-color);
    transform: scale(1.02);
  }

  .signup__button {
    padding: 1rem;
    background-color: var(--primary-color);
    color: var(--background-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1rem;
    transition:
      background-color 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
    position: relative;
    box-sizing: border-box;
    z-index: 3;
    animation: scaleUp 0.3s ease-out forwards;
    animation-delay: 1.4s;
  }

  .signup__button:hover {
    animation: buttonHover 0.3s forwards;
  }

  .signup__button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  }

  .signup__button:hover::after {
    opacity: 1;
  }
  p {
    font-size: 1.2rem;
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    opacity: 0;
    animation: fadeInMessage 0.6s ease-out forwards;
  }

  @keyframes fadeInMessage {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  p {
    color: var(--accent-color);
    animation: messageIn 1s ease-out forwards;
  }

  @keyframes messageIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(-10px);
    }
  }
</style>
