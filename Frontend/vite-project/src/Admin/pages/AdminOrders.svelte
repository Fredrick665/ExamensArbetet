<script lang="ts">
  import AdminMenu from "../components/AdminMenu.svelte";
  import type { Order } from "../../utils/interfaces";

  let isAdmin = $state(false);
  let orderIdToUpdate = $state("");
  let itemName = $state("");
  let itemCost = $state("");
  let itemQuantity = $state("");
  let orderIdToDelete = $state("");
  let usernameToFetch = $state("");
  let orders = $state<Order[]>([]);

  $effect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role === "admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  });
  async function fetchOrders() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch("http://localhost:5000/api/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response status (all orders):", response.status);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      orders = data;
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  }

  async function fetchUserOrders() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch(
        `http://localhost:5000/api/orders/${usernameToFetch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response status (user orders):", response.status);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      orders = data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  }
  async function updateOrder() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const updateData = {
        items: [
          {
            name: itemName,
            cost: Number(itemCost),
            quantity: Number(itemQuantity),
          },
        ],
      };
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderIdToUpdate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid uppdatering av order:", error);
    }
  }
  async function deleteOrder() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid radering av order:", error);
    }
  }

  async function deleteAllOrders() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch(`http://localhost:5000/api/orders`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid radering av alla ordrar:", error);
    }
  }
  async function ResetFormdata() {
    orderIdToUpdate = "";
    itemName = "";
    itemCost = "";
    itemQuantity = "";
  }
</script>

{#if isAdmin}
  <main class="orders">
    <header class="orders__header">
      <h1 class="orders__title">Admin Orders Panel</h1>
    </header>
    <AdminMenu />
    <section class="orders__section orders__section--fetch-all">
      <button
        class="orders__button"
        onclick={() => {
          fetchOrders();
        }}
      >
        Hämta alla ordrar
      </button>
    </section>
    <aside class="order__aside">
      <ul class="order__list">
        {#each orders as order}
          <li class="order__card">
            <h2 class="order__card-title">{order.username}</h2>
            <p class="order__card-total">Total: {order.total} kr</p>
            <p class="order__card-id">Order ID: {order.orderId}</p>
            <ul>
              {#each order.items as item}
                <li>{item.name} x {item.quantity} - {item.cost} kr</li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </aside>

    <section class="orders__section orders__section--fetch-user">
      <label class="orders__label" for="username">Ange användarnamn:</label>
      <input
        id="username"
        type="text"
        bind:value={usernameToFetch}
        class="orders__input"
      />
      <button
        class="orders__button"
        onclick={() => {
          fetchUserOrders();
        }}
      >
        Hämta användarorder
      </button>
      <section class="orders__section orders__section--update">
        <label class="orders__label" for="order-id">
          Order ID att ändra:
        </label>
        <input
          id="order-id"
          type="text"
          bind:value={orderIdToUpdate}
          class="orders__input"
        />

        <label class="orders__label" for="item-name"> Artikel Namn: </label>
        <input
          id="item-name"
          type="text"
          bind:value={itemName}
          class="orders__input"
        />

        <label class="orders__label" for="item-cost"> Artikel Kostnad: </label>
        <input
          id="item-cost"
          type="number"
          bind:value={itemCost}
          class="orders__input"
        />

        <label class="orders__label" for="item-quantity">
          Artikel Kvantitet:
        </label>
        <input
          id="item-quantity"
          type="number"
          bind:value={itemQuantity}
          class="orders__input"
        />
        <button
          class="orders__button"
          onclick={async () => {
            await updateOrder();
            await fetchOrders();
            await ResetFormdata();
          }}
        >
          Ändra order
        </button>
      </section>

      <section class="orders__section orders__section--delete">
        <label class="orders__label" for="delete-order">
          Order ID att ta bort:
        </label>
        <input
          id="delete-order"
          type="text"
          bind:value={orderIdToDelete}
          class="orders__input"
        />
        <button
          class="orders__button"
          onclick={async () => {
            await deleteOrder();
            await fetchOrders();
          }}
        >
          Ta bort order
        </button>
      </section>

      <section class="orders__section orders__section--delete-all">
        <button
          class="orders__button orders__button--danger"
          onclick={async () => {
            await deleteAllOrders();
            await fetchOrders();
          }}
        >
          Ta bort alla ordrar
        </button>
      </section>
    </section>
  </main>
{:else}
  <main>
    <h1>Åtkomst nekad</h1>
    <p>Du har inte behörighet att komma åt denna sida.</p>
  </main>
{/if}

<style>
  .orders {
    display: grid;
    gap: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: "Inter", sans-serif;
  }

  .orders__header {
    background: linear-gradient(
      135deg,
      var(--primary-color) 40%,
      var(--neutral-color) 100%
    );
    text-align: center;
    padding: 1rem 0;
  }

  .orders__title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--background-color);
  }

  .orders__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--neutral-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .orders__label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .orders__input {
    width: 100%;
    max-width: 280px;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 1rem;
    text-align: center;
    border-radius: 8px;
    outline: none;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
    padding: 0.75rem;
  }

  .orders__button {
    background: var(--primary-color);
    color: var(--background-color);
    font-size: 1rem;
    font-weight: 600;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
    transition:
      background 0.3s ease,
      transform 0.2s ease;
    padding: 0.75rem 1.5rem;
  }

  .orders__button:hover {
    background: var(--secondary-accent-color);
    transform: translateY(-2px);
  }

  .orders__button--danger {
    background: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    font-weight: 700;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
  }

  .orders__button--danger:hover {
    background: var(--primary-color);
    color: var(--background-color);
  }
  .order__aside {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    background: var(--background-color);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-left: 2px solid var(--primary-color);
  }

  .order__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .order__card {
    background: var(--primary-color);
    color: var(--background-color);
    border-radius: 8px;
    transition: transform 0.3s ease;
    cursor: pointer;
    text-align: center;
  }

  .order__card:hover {
    transform: scale(1.05);
  }

  .order__card-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
