<script lang="ts">
  import { routes } from "../routing/routes";
  import Bild5 from "../assets/bild5.jpeg";
  import { push } from "svelte-spa-router";

  let routeEntries: string[] = $state([]);
  let isLoggedIn = $state(false);

  function updateRoutes() {
    isLoggedIn = !!sessionStorage.getItem("username");

    if (!isLoggedIn) {
      routeEntries = Object.keys(routes).filter(
        (route) => route === "/Login" || route === "/Register" || route === "/"
      );
    } else {
      const userRole = sessionStorage.getItem("userRole");

      if (userRole === "user") {
        routeEntries = Object.keys(routes)
          .filter((route) => !route.startsWith("/Admin"))
          .filter((route) => route !== "/Register" && route !== "/Login");
      } else if (userRole === "admin") {
        routeEntries = Object.keys(routes);
      }
    }
  }

  updateRoutes();
  $effect(() => {
    const listener = () => updateRoutes();
    window.addEventListener("login", listener);
    return () => window.removeEventListener("login", listener);
  });
  async function logout() {
    sessionStorage.clear();
    push("/");
    updateRoutes();
  }
</script>

<header class="header">
  <img class="header__logo" src={Bild5} alt="Fransvård" />
  <nav class="header__nav">
    <ul class="header__nav-list">
      {#each routeEntries as route}
        <li class="header__nav-item">
          <a href={`#${route}`} class="header__nav-link">
            {route === "/" ? "Home" : route.slice(1)}
          </a>
        </li>
      {/each}
      {#if isLoggedIn}
        <li class="header__nav-item">
          <button type="button" onclick={logout} class="logout-button">
            Logout
          </button>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: var(--primary-color);
    padding: 20px;
    border-bottom: 3px solid var(--accent-color);
    overflow: hidden;
  }

  .header__logo {
    width: 5%;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
    position: relative;
  }

  .header__logo::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--accent-color);
    border-radius: 3px;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .header__logo:hover::before {
    transform: scaleX(1);
  }

  .header__nav {
    position: relative;
  }

  .header__nav-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .header__nav-item {
    position: relative;
  }

  .header__nav-link {
    color: var(--background-color);
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    position: relative;
    display: inline-block;
  }

  .header__nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .header__nav-link:hover::before {
    transform: scaleX(1);
  }

  .header__nav-link:hover {
    background-color: var(--accent-color);
    color: var(--primary-color);
  }

  .header::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      var(--accent-color) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.3;
    transform: translateY(-50%);
  }

  .header__logo::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    border-radius: 50%;
    opacity: 0.2;
  }
  .logout-button {
    background-color: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--accent-color);
    border-radius: 4px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    padding: 5px 10px;
  }

  .logout-button:hover {
    background-color: var(--accent-color);
    color: var(--background-color);
  }
</style>
