<script lang="ts">
  import type { User } from "../utils/interfaces";
  import { push } from "svelte-spa-router";

  let username = $state<string>("");
  let password = $state<string>("");
  let message = $state<string>("");
  let loggedInUser = $state<User | null>(null);

  async function loginUser(event: Event): Promise<void> {
    event.preventDefault();
    console.log(
      "loginUser: Hämtar inloggningsuppgifter för användare:",
      username
    );

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("loginUser: Svar från servern:", response);
      const data = await response.json();
      console.log("loginUser: Parsat svar från servern:", data);

      if (response.ok && data.token) {
        sessionStorage.setItem("jwt", data.token);
        sessionStorage.setItem("userRole", data.user.role);
        sessionStorage.setItem("username", data.user.username);

        loggedInUser = data.user;
        message = "Inloggning lyckades!";
        console.log("loginUser: Inloggning lyckades, användare:", data.user);

        console.log("loginUser: Skickar login-event...");
        window.dispatchEvent(new CustomEvent("login"));
        console.log("loginUser: Login-event skickat!");

        console.log("loginUser: User Role efter inloggning:", data.user.role);
      } else {
        message = data.message || "Inloggning misslyckades.";
        console.error(
          "loginUser: Inloggning misslyckades med meddelandet:",
          message
        );
      }
    } catch (error) {
      console.error("loginUser: Fel vid inloggning:", error);
      message = "Ett fel uppstod under inloggningen.";
    }
  }

  function fetchUsername(): void {
    const storedUsername = sessionStorage.getItem("username");
    console.log(
      "fetchUsername: Hämtat användarnamn från sessionStorage:",
      storedUsername
    );
  }

  async function handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    console.log("handleLogin: Initierar inloggning");
    await loginUser(event);
    fetchUsername();

    if (loggedInUser) {
      console.log(
        "handleLogin: Inloggning verifierad, navigerar om 2 sekunder"
      );
      setTimeout(() => {
        console.log("handleLogin: Navigering påbörjas");
        push("/");
      }, 2000);
    } else {
      console.warn("handleLogin: Inloggning misslyckades, navigering avbryts");
    }
  }
</script>

<main>
  <section class="login">
    <header class="login__header">
      <h1 class="login__title">Login</h1>
    </header>

    <form class="login__form" onsubmit={handleLogin}>
      <input
        type="text"
        placeholder="Användarnamn"
        bind:value={username}
        class="login__input"
      />
      <input
        type="password"
        placeholder="Lösenord"
        bind:value={password}
        class="login__input"
      />
      <button type="submit" class="login__button">Login</button>
    </form>

    {#if message}
      <p class="login__message">{message}</p>
    {/if}

    {#if loggedInUser}
      <p class="login__user">Inloggad som: {loggedInUser.username}</p>
    {/if}
  </section>
</main>

<style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .login__header {
    z-index: 3;
    margin-bottom: 15px;
  }

  .login__title {
    font-size: 2.5rem;
    color: var(--button-text-color);
    position: relative;
    z-index: 3;
    opacity: 0;
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login__title::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 5px;
    width: 100%;
    background: var(--primary-color);
    border-radius: 2px;
  }

  .login__form {
    display: flex;
    flex-direction: column;
    width: 320px;
    z-index: 3;
  }

  .login__input {
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    position: relative;
    box-sizing: border-box;
    z-index: 3;
    opacity: 0;
    animation: fadeInInput 0.5s ease-out forwards;
  }

  @keyframes fadeInInput {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login__input:nth-child(1) {
    animation-delay: 0.2s;
  }

  .login__input:nth-child(2) {
    animation-delay: 0.4s;
  }

  .login__input:hover,
  .login__input:focus {
    background-color: var(--secondary-accent-color);
    border-color: var(--primary-color);
    transform: scale(1.05);
  }

  .login__button {
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
  }

  .login__button:hover {
    background-color: var(--accent-color);
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .login__button::after {
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

  .login__button:hover::after {
    opacity: 1;
  }

  .login__message,
  .login__user {
    font-size: 1rem;
    margin-top: 10px;
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
  .login__message,
  .login__user {
    font-size: 1.2rem;
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login__message {
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

  .login__user {
    color: var(--secondary-color);
    animation: userIn 1s ease-out forwards;
  }

  @keyframes userIn {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }
    50% {
      opacity: 1;
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
