<script lang="ts">
  import { AdminRoutes } from "../../routing/routes";
  const routeEntries = Object.keys(AdminRoutes);
</script>

<main>
  <header class="header">
    <nav class="header__nav">
      <ul class="header__nav-list">
        {#each routeEntries as route}
          <li class="header__nav-item">
            <a
              href={"#" + route}
              class="header__nav-link header__nav-link--hovered"
            >
              {route === "/" ? "Home" : route.slice(1)}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </header>
</main>

<style>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    background-color: var(--neutral-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 220px;
  }
  .header__nav-link {
    color: var(--clr-primary-text);
    font-size: 1.5rem;
    font-weight: 400;
    text-decoration: none;
    position: relative;
    display: inline-block;
    padding: 0.5rem 1rem;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .header__nav-link:hover {
    color: var(--clr-primary);
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }

  .header__nav-link::before,
  .header__nav-link::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background-color: var(--clr-primary);
    transition: width 0.3s ease;
  }

  .header__nav-link::before {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .header__nav-link::after {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .header__nav-link:hover::before,
  .header__nav-link:hover::after {
    width: 100%;
  }
</style>
