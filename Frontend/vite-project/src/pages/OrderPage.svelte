<script lang="ts">
  import { onMount } from "svelte";
  import { cart, updateCart } from "../utils/stores/Store.svelte";
  import { fetchTreatments } from "../lib/Api";
  import type { Treatments } from "../utils/interfaces";

  let treatments = $state<Treatments[]>([]);

  let showNotification = $state(false);
  let notificationMessage = $state("");
  let totalCost = $derived.by(() => {
    return cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  });

  onMount(async () => {
    treatments = await fetchTreatments();
  });

  $effect(() => {
    cart.forEach((item) => {
      const previousQuantity = item.previousQuantity || 0;
      if (item.quantity !== previousQuantity) {
        notificationMessage = `Du har just nu ${item.name} ${item.quantity} stycken i varukorgen`;
        showNotification = true;
      }
      item.previousQuantity = item.quantity;
    });
    setTimeout(() => {
      showNotification = false;
    }, 30000);
  });
</script>

<main class="orderpage">
  <h1 class="orderpage__title">Behandlingar</h1>
  <ul class="orderpage__list">
    {#each treatments as treatment}
      <li class="orderpage__item">
        <h2 class="orderpage__item-title">{treatment.name}</h2>
        <p class="orderpage__item-cost">Kostnad: {treatment.cost} kronor</p>
        <p class="orderpage__item-time">Tid: {treatment.time}</p>
        <p class="orderpage__item-description">{treatment.description}</p>

        <button
          class="orderpage__button"
          onclick={() => updateCart(treatment, "decrease")}
        >
          -
        </button>
        <span class="orderpage__item-quantity">
          Antal: {cart.find((item) => item.name === treatment.name)?.quantity ||
            0}
        </span>
        <button
          class="orderpage__button"
          onclick={() => {
            const action = cart.find((item) => item.name === treatment.name)
              ? "increase"
              : "add";
            updateCart(treatment, action);
          }}
        >
          +
        </button>
      </li>
    {/each}
  </ul>

  {#if showNotification}
    <article class="notification_container">
      <p class="notification">
        {notificationMessage}
        {#if cart.length > 0}
          <span class="total-cost">Total kostnad: {totalCost} kr</span>
        {/if}
      </p>
    </article>
  {/if}

  <article class="orderpage__item-controls"></article>
  <a href="#/ConfirmedOrders" class="orderpage__confirm-button-link">
    <button class="orderpage__confirm-button"> Till Varukorgen </button>
  </a>
</main>

<style>
  .orderpage {
    padding: 2rem;
    background-color: var(--background-color);
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
  }

  .orderpage__title {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
  }

  .orderpage__title::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -10px;
    width: 50%;
    height: 4px;
    background: var(--accent-color);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .orderpage__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .orderpage__item {
    background: var(--neutral-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    position: relative;
    transition:
      background 0.3s,
      box-shadow 0.3s;
    overflow: hidden;
  }

  .orderpage__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        135deg,
        rgba(75, 0, 130, 0.1) 25%,
        transparent 25%
      )
      no-repeat;
    background-size: 10px 10px;
    opacity: 0.1;
    pointer-events: none;
  }

  .orderpage__item:hover {
    background: var(--secondary-accent-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .orderpage__item-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  .orderpage__item-description,
  .orderpage__item-cost,
  .orderpage__item-time {
    margin: 0.5rem 0;
    color: var(--text-color);
  }

  .orderpage__item-controls {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }

  .orderpage__button {
    background-color: var(--accent-color);
    color: var(--background-color);
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition:
      background-color 0.3s,
      transform 0.3s;
  }

  .orderpage__button:hover {
    background-color: var(--secondary-accent-color);
    color: var(--background-color);
    transform: scale(1.05);
  }

  .orderpage__confirm-button-link {
    display: block;
    text-align: center;
    margin-top: 2rem;
  }

  .orderpage__confirm-button {
    background-color: var(--primary-color);
    color: var(--background-color);
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    transition:
      background-color 0.3s,
      transform 0.3s;
  }

  .orderpage__confirm-button:hover {
    background-color: var(--secondary-accent-color);
    color: var(--background-color);
    transform: scale(1.05);
  }

  .notification_container {
    position: sticky;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 90%;
    max-width: 500px;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .notification {
    position: relative;
    background: var(--primary-color);
    color: var(--background-color);
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    animation: slideDownFadeOut 4s ease-in-out forwards;
    margin-bottom: 1rem;
  }

  .notification::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--accent-color);
  }

  .notification::after {
    content: "";
    position: absolute;
    bottom: -15px;
    right: -15px;
    width: 50px;
    height: 50px;
    background: var(--secondary-accent-color);
    border-radius: 50%;
    opacity: 0.6;
  }

  .total-cost {
    display: block;
    margin-top: 0.8rem;
    font-weight: bold;
    font-size: 1rem;
    color: var(--accent-color);
    position: relative;
    padding-top: 0.4rem;
  }

  .total-cost::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent-color);
    opacity: 0.8;
  }

  @keyframes slideDownFadeOut {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    10% {
      transform: translateY(0);
      opacity: 1;
    }
    90% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }
</style>
