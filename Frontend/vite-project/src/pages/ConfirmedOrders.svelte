<script lang="ts">
  import {
    cart,
    updateCart,
    finalizeOrder,
  } from "../utils/stores/Store.svelte";
</script>

<main>
  <section class="confirmed-orders">
    <article class="confirmed-orders__content">
      <h1 class="confirmed-orders__title">Dina Valda Behandlingar</h1>

      {#if cart.length === 0}
        <p class="confirmed-orders__empty">
          Du har inte valt några Behandlingar
        </p>
      {:else}
        <ul class="confirmed-orders__list">
          {#each cart as item}
            <li class="confirmed-orders__item">
              <h2 class="confirmed-orders__item-name">{item.name}</h2>
              <p class="confirmed-orders__item-cost">
                Kostnad: {item.cost} kronor
              </p>
              <p class="confirmed-orders__item-time">Tid: {item.time}</p>
              <p class="confirmed-orders__item-quantity">
                Antal: {item.quantity}
              </p>
              <button
                class="confirmed-orders__button confirmed-orders__button--decrease"
                onclick={() => updateCart(item, "decrease")}
                disabled={item.quantity === 0}
              >
                -
              </button>

              <button
                class="confirmed-orders__button confirmed-orders__button--increase"
                onclick={() => updateCart(item, "increase")}
              >
                +
              </button>
            </li>
          {/each}
          <nav class="confirmed-orders__nav">
            <a href="#/Orderhistory" class="confirmed-orders__link">
              <button
                class="confirmed-orders__confirm-button"
                onclick={() => {
                  finalizeOrder();
                }}
              >
                Bekräfta beställningen
              </button>
            </a>
          </nav>
        </ul>
      {/if}
    </article>
  </section>
</main>

<style>
  .confirmed-orders {
    padding: 2rem;
    max-width: 90%;
    margin: 0 auto;
    background: var(--background-color);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .confirmed-orders__title {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    position: relative;
    opacity: 0;
    animation: slideIn 0.5s forwards;
    animation-delay: 0.2s;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .confirmed-orders__empty {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-color);
    margin: 2rem 0;
    font-style: italic;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    animation-delay: 0.6s;
  }

  .confirmed-orders__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .confirmed-orders__item {
    background: var(--neutral-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 1rem;
    position: relative;
    overflow: hidden;
    transition:
      background 0.3s,
      box-shadow 0.3s;
    opacity: 0;
    animation: fadeInItem 0.5s forwards;
  }

  @keyframes fadeInItem {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .confirmed-orders__item:nth-child(1) {
    animation-delay: 0.3s;
  }

  .confirmed-orders__item:nth-child(2) {
    animation-delay: 0.4s;
  }

  .confirmed-orders__item:nth-child(3) {
    animation-delay: 0.5s;
  }

  .confirmed-orders__item::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    opacity: 0.3;
    transition: opacity 0.3s;
    z-index: 0;
  }

  .confirmed-orders__item::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--accent-color);
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform 0.3s;
    z-index: 0;
  }

  .confirmed-orders__item:hover {
    background: var(--secondary-accent-color);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .confirmed-orders__item:hover::before {
    opacity: 0.5;
  }

  .confirmed-orders__item:hover::after {
    transform: scaleX(1);
  }

  .confirmed-orders__item-name {
    font-size: 1.5rem;
    color: var(--primary-color);
    position: relative;
    z-index: 1;
  }

  .confirmed-orders__item-name::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 4px;
    background: var(--accent-color);
    border-radius: 2px;
    z-index: 1;
  }

  .confirmed-orders__item-cost,
  .confirmed-orders__item-time,
  .confirmed-orders__item-quantity {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: var(--text-color);
  }

  .confirmed-orders__button,
  .confirmed-orders__confirm-button {
    border: none;
    border-radius: 4px;
    color: var(--background-color);
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    transition:
      background 0.3s,
      transform 0.3s;
    position: relative;
    z-index: 1;
    background: var(--primary-color);
  }

  .confirmed-orders__confirm-button {
    padding: 0.75rem 1.5rem;
    margin-top: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .confirmed-orders__button:hover,
  .confirmed-orders__confirm-button:hover {
    background: var(--text-color);
    color: var(--background-color);
    transform: scale(1.05);
  }

  .confirmed-orders__button:disabled,
  .confirmed-orders__button:disabled:hover {
    background: var(--neutral-color);
    color: var(--text-color);
    cursor: not-allowed;
  }

  .confirmed-orders__confirm-button:focus,
  .confirmed-orders__button:focus {
    outline: 3px solid var(--accent-color);
    outline-offset: 2px;
  }

  .confirmed-orders__confirm-button:active,
  .confirmed-orders__button:active {
    background: var(--primary-color);
    transform: scale(0.98);
  }

  .confirmed-orders__confirm-button::before,
  .confirmed-orders__confirm-button::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    transition:
      transform 0.3s,
      opacity 0.3s;
  }

  .confirmed-orders__confirm-button::before {
    background: var(--accent-color);
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    transform: scale(0);
    z-index: 0;
  }

  .confirmed-orders__confirm-button::after {
    background: var(--secondary-accent-color);
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    transform: scale(0);
    z-index: 0;
  }
</style>
