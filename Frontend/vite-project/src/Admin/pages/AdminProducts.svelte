<script lang="ts">
  import AdminMenu from "../components/AdminMenu.svelte";
  import type { Treatments } from "../../utils/interfaces";

  let isAdmin = $state(false);
  let productName = $state("");
  let productIdToUpdate = $state("");
  let productIdToDelete = $state("");
  let updateName = $state("");
  let updateDescription = $state("");
  let updateTime = $state("");
  let updateCost = $state("");
  let productDescription = $state("");
  let productTime = $state("");
  let productCost = $state("");
  let products = $state<Treatments[]>([]);

  $effect(() => {
    const role = sessionStorage.getItem("userRole");
    isAdmin = role === "admin";
  });

  async function fetchProducts() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch("http://localhost:5000/api/productsAdmin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      products = data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async function createProduct() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const newProduct = {
        name: productName,
        description: productDescription,
        time: productTime,
        cost: Number(productCost),
      };
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid skapande av produkt:", error);
    }
  }

  async function updateProduct() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const updateData = {
        name: updateName,
        description: updateDescription,
        time: updateTime,
        cost: Number(updateCost),
      };
      const response = await fetch(
        `http://localhost:5000/api/products/${productIdToUpdate}`,
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
      console.log("Produkt uppdaterad:", data);
    } catch (error) {
      console.error("Fel vid uppdatering av produkt:", error);
    }
  }

  async function deleteProduct() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      if (!productIdToDelete) {
        throw new Error("Vänligen ange ett produkt-ID att ta bort.");
      }
      const response = await fetch(
        `http://localhost:5000/api/products/${productIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  }

  async function deleteAllProducts() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch("http://localhost:5000/api/products", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Fel vid borttagning av alla produkter:", error);
    }
  }
  async function ResetFormdata() {
    productName = "";
    productTime = "";
    productCost = "";
    productDescription = "";
    productIdToUpdate = "";
    updateName = "";
    updateDescription = "";
    updateTime = "";
    updateCost = "";
  }
</script>

{#if isAdmin}
  <main class="products">
    <header class="products__header">
      <h1 class="products__title">Admin Products Panel</h1>
    </header>
    <AdminMenu />

    <section class="products__section products__section--get">
      <button class="products__button" onclick={fetchProducts}>
        Hämta alla produkter
      </button>
    </section>

    <section class="products__section products__section--create">
      <label class="products__label" for="product-name">Produktnamn:</label>
      <input
        id="product-name"
        type="text"
        bind:value={productName}
        class="products__input"
      />

      <label class="products__label" for="product-description">
        Beskrivning:
      </label>
      <input
        id="product-description"
        type="text"
        bind:value={productDescription}
        class="products__input"
      />

      <label class="products__label" for="product-time">Tid:</label>
      <input
        id="product-time"
        type="text"
        bind:value={productTime}
        class="products__input"
      />

      <label class="products__label" for="product-cost">Kostnad:</label>
      <input
        id="product-cost"
        type="number"
        bind:value={productCost}
        class="products__input"
      />

      <button
        class="products__button"
        onclick={async () => {
          await createProduct();
          await fetchProducts();
          await ResetFormdata();
        }}
      >
        Skapa produkt
      </button>
    </section>

    <section class="products__section products__section--update">
      <label class="products__label" for="update-id">
        Uppdatera produkt ID:
      </label>
      <input
        id="update-id"
        type="text"
        bind:value={productIdToUpdate}
        class="products__input"
      />

      <label class="products__label" for="update-name">Nytt namn:</label>
      <input
        id="update-name"
        type="text"
        bind:value={updateName}
        class="products__input"
      />

      <label class="products__label" for="update-description">
        Ny beskrivning:
      </label>
      <input
        id="update-description"
        type="text"
        bind:value={updateDescription}
        class="products__input"
      />

      <label class="products__label" for="update-time">Ny tid:</label>
      <input
        id="update-time"
        type="text"
        bind:value={updateTime}
        class="products__input"
      />

      <label class="products__label" for="update-cost">Ny kostnad:</label>
      <input
        id="update-cost"
        type="number"
        bind:value={updateCost}
        class="products__input"
      />

      <button
        class="products__button"
        onclick={async () => {
          await updateProduct();
          await fetchProducts();
          await ResetFormdata();
        }}
      >
        Uppdatera produkt
      </button>
    </section>

    <section class="products__section products__section--delete">
      <label class="products__label" for="delete-id">
        Ta bort produkt ID:
      </label>
      <input
        id="delete-id"
        type="text"
        bind:value={productIdToDelete}
        class="products__input"
      />
      <button
        class="products__button"
        onclick={async () => {
          await deleteProduct();
          await fetchProducts();
        }}
      >
        Ta bort produkt
      </button>
    </section>

    <section class="products__section products__section--delete-all">
      <button
        class="products__button products__button--danger"
        onclick={async () => {
          await deleteAllProducts();
          await fetchProducts();
        }}
      >
        Ta bort alla produkter
      </button>
    </section>

    <aside class="products__aside">
      <ul class="products__list">
        {#each products as product}
          <li class="products__card">
            <h2 class="products__card-title">{product.name}</h2>
            <p class="products__card-id">ID: {product.productId}</p>
            <p class="products__card-description">
              Beskrivning: {product.description}
            </p>
            <p class="products__card-time">Tid: {product.time}</p>
            <p class="products__card-cost">Kostnad: {product.cost}</p>
          </li>
        {/each}
      </ul>
    </aside>
  </main>
{:else}
  <main>
    <h1>Åtkomst nekad</h1>
    <p>Du har inte behörighet att komma åt denna sida.</p>
  </main>
{/if}

<style>
  .products {
    position: relative;
    display: grid;
    gap: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: "Inter", sans-serif;
  }

  .products__header {
    background: linear-gradient(
      135deg,
      var(--primary-color) 40%,
      var(--neutral-color) 100%
    );
    text-align: center;
    padding: 1rem 0;
  }

  .products__title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--background-color);
  }

  .products__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--neutral-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .products__label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .products__input {
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
  }

  .products__button {
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

  .products__button:hover {
    background: var(--secondary-accent-color);
    transform: translateY(-2px);
  }

  .products__button--danger {
    background: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    font-weight: 700;
    border-radius: 8px;
  }

  .products__button--danger:hover {
    background: var(--primary-color);
    color: var(--background-color);
  }

  .products__aside {
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

  .products__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .products__card {
    background: var(--primary-color);
    color: var(--background-color);
    border-radius: 8px;
    transition: transform 0.3s ease;
    cursor: pointer;
    text-align: center;
  }

  .products__card:hover {
    transform: scale(1.05);
  }

  .products__card-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
