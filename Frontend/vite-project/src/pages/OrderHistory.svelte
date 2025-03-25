<script lang="ts">
  import type { Order, UpdateCartItem, Treatments } from "../utils/interfaces";

  let orders: Order[] = $state([]);
  let username = $state<string>(sessionStorage.getItem("username") || "");
  let treatments: Treatments[] = $state([]);

  async function fetchTreatments(): Promise<void> {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      treatments = await response.json();
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  }

  async function fetchUserOrders(): Promise<void> {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) throw new Error("Token saknas! Se till att du är inloggad.");
      const response = await fetch(`http://localhost:5000/api/myorders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: Order[] = await response.json();

      if (treatments.length > 0) {
        data.forEach((order) => {
          order.items.forEach((item) => {
            if (!item.name || !treatments.find((t) => t.name === item.name)) {
              item.name = treatments[0].name;
            }
          });
        });
      }

      orders = data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  }

  async function updateMyOrder(
    orderId: string,
    items: UpdateCartItem[]
  ): Promise<void> {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) return;

      const filteredItems = items.map(({ name, quantity }) => ({
        name,
        quantity,
      }));

      const response = await fetch(
        `http://localhost:5000/api/updateMyOrder/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items: filteredItems }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Fel vid uppdatering:", responseData);
        throw new Error("Kunde inte uppdatera order");
      }

      orders = orders.map((order) =>
        order.orderId === orderId ? responseData : order
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }

  async function deleteMyOrder(orderId: string): Promise<void> {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) return;
      const response = await fetch(
        `http://localhost:5000/api/myorders/${orderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Kunde inte ta bort order");
      orders = orders.filter((order) => order.orderId !== orderId);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  $effect(() => {
    if (username) {
      (async () => {
        await fetchTreatments();
        await fetchUserOrders();
      })();
    }
  });
</script>

<main class="order-history">
  <h1 class="order-history__title">Dina Beställningar</h1>
  {#if orders.length === 0}
    <p class="order-history__empty-message">Inga beställningar har lagts</p>
  {:else}
    <article class="order-history__summary">
      <ul class="order-history__item-list">
        {#each orders as order}
          <article class="order-history__summary">
            <ul class="order-history__item-list">
              {#each order.items as item}
                <li class="order-history__item">
                  <select class="order-history__select" bind:value={item.name}>
                    {#each treatments as treatment}
                      <option
                        class="order-history__option"
                        value={treatment.name}
                      >
                        {treatment.name}
                      </option>
                    {/each}
                  </select>
                  <p class="order-history__item-cost">
                    Kostnad: {item.cost} kr
                  </p>
                  <input
                    type="number"
                    bind:value={item.quantity}
                    min="1"
                    class="order-history__item-quantity"
                  />
                  <p class="order-history__item-total">
                    Delkostnad: {item.cost * item.quantity} kr
                  </p>
                </li>
              {/each}
            </ul>
            <h2 class="order-history__total-cost">Totalt: {order.total} kr</h2>
            <button
              class="order-history__button order-history__button--update"
              onclick={() => updateMyOrder(order.orderId, order.items)}
            >
              Spara ändringar
            </button>

            <button
              class="order-history__button order-history__button--delete"
              onclick={() => deleteMyOrder(order.orderId)}
            >
              Ta bort order
            </button>
          </article>
        {/each}
      </ul>
    </article>
  {/if}
  <nav class="order-history__navigation">
    <a href="#/">
      <button class="order-history__nav-button">
        Gå tillbaka till startsidan
      </button>
    </a>
    <a href="#/Orderpage">
      <button class="order-history__nav-button"> Gör en ny Beställning </button>
    </a>
  </nav>
</main>

<style>
  .order-history {
    padding: 2rem;
    max-width: 80%;
    margin: 0 auto;
    background: var(--background-color);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }

  .order-history::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    z-index: -1;
    transition: opacity 0.5s;
  }

  .order-history__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
  }

  .order-history__title::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -12px;
    width: 50%;
    height: 4px;
    background: var(--primary-color);
    border-radius: 2px;
    transform: translateX(-50%);
  }

  .order-history__empty-message {
    text-align: center;
    font-size: 1.6rem;
    color: var(--text-color);
    margin: 2rem 0;
    font-weight: 600;
  }

  .order-history__summary {
    background: var(--neutral-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .order-history__summary::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: var(--primary-color);
    border-radius: 12px 12px 0 0;
  }

  .order-history__item-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .order-history__item {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--background-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    transition:
      box-shadow 0.3s,
      transform 0.3s;
  }

  .order-history__item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .order-history__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: var(--accent-color);
    border-radius: 5px 0 0 5px;
  }

  .order-history__item-cost,
  .order-history__item-quantity,
  .order-history__item-total {
    font-size: 1.2rem;
    color: var(--text-color);
    position: relative;
    padding: 0.5rem;
    border-radius: 4px;
    background: var(--neutral-color);
    margin: 0.5rem 0;
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition:
      background 0.3s,
      box-shadow 0.3s;
  }

  .order-history__item-cost::before,
  .order-history__item-quantity::before,
  .order-history__item-total::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    border-radius: 4px 0 0 4px;
  }

  .order-history__item-cost::before {
    background: var(--accent-color);
  }

  .order-history__item-quantity::before {
    background: var(--secondary-accent-color);
  }

  .order-history__item-total::before {
    background: var(--primary-color);
  }

  .order-history__item-cost:hover,
  .order-history__item-quantity:hover,
  .order-history__item-total:hover {
    background: var(--background-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .order-history__total-cost {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-top: 1.5rem;
    position: relative;
  }

  .order-history__total-cost::before {
    content: "";
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--primary-color);
    z-index: -1;
  }

  .order-history__nav-button {
    border: none;
    border-radius: 6px;
    color: var(--background-color);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.75rem 1.5rem;
    margin-top: 1.5rem;
    transition:
      background 0.3s,
      transform 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .order-history__nav-button {
    background: var(--accent-color);
    margin: 0 0.5rem;
  }

  .order-history__nav-button:hover {
    background: var(--primary-color);
  }

  .order-history__button {
    background-color: var(--primary-color);
    color: var(--neutral-color);
    border: 2px solid var(--accent-color);
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    transition:
      background 0.3s,
      transform 0.2s;
    text-transform: uppercase;
  }

  .order-history__button:hover {
    background-color: var(--primary-color);
    color: var(--accent-color);
    transform: scale(1.05);
  }

  .order-history__button:active {
    transform: scale(0.95);
  }

  .order-history__button--delete {
    border-color: var(--secondary-accent-color);
    background-color: var(--primary-color);
  }

  .order-history__button--delete:hover {
    background-color: var(--primary-color);
  }

  .order-history__select {
    background-color: var(--background-color);
    color: var(--text-color);
    border: 2px solid var(--border-color);
    font-size: 1rem;
    font-weight: bold;
    transition:
      border 0.3s,
      box-shadow 0.3s;
  }

  .order-history__select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color);
    outline: none;
  }

  .order-history__option {
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 1rem;
    font-weight: bold;
  }
</style>
