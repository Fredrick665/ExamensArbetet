<script lang="ts">
  import type { User } from "../../utils/interfaces";
  import AdminMenu from "../components/AdminMenu.svelte";

  let isAdmin = $state(false);
  let users = $state<User[]>([]);
  let userIdForRoleUpdate = $state("");
  let newRole = $state("");
  let userIdToDelete = $state("");

  $effect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role === "admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  });
  async function fetchUsers() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      for (const user of data) {
        user.id = user._id;
      }
      users = data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  async function updateUserRole() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch(
        `http://localhost:5000/api/users/${userIdForRoleUpdate}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }
  async function deleteUserById() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch(
        `http://localhost:5000/api/users/${userIdToDelete}`,
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
      console.error("Error deleting user:", error);
    }
  }

  async function deleteAllUsers() {
    try {
      const token = sessionStorage.getItem("jwt");
      if (!token) {
        throw new Error("Token saknas! Se till att du är inloggad som admin.");
      }
      const response = await fetch("http://localhost:5000/api/users", {
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
      console.log("All users deleted successfully:", data);
      users = [];
    } catch (error) {
      console.error("Error deleting all users:", error);
    }
  }
  async function ResetFormdata() {
    userIdForRoleUpdate = "";
    newRole = "";
    userIdToDelete = "";
  }
</script>

{#if isAdmin}
  <main class="users">
    <header class="users__header">
      <h1 class="users__title">Admin Users Panel</h1>
    </header>
    <AdminMenu />
    <section class="users__section users__section--get">
      <button
        class="users__button"
        onclick={() => {
          fetchUsers();
        }}
      >
        Hämta alla användare
      </button>
    </section>
    <aside class="users__aside">
      <ul class="users__list">
        {#each users as user}
          <li class="users__card">
            <h2 class="users__card-title">{user.username}</h2>
            <p class="users__card-id">{user.userId}</p>
            <p class="users__card-role">{user.role}</p>
          </li>
        {/each}
      </ul>
    </aside>
    <section class="users__section users__section--update">
      <label class="users__label" for="update-role-user"
        >Ange användar-ID:</label
      >
      <input
        id="update-role-user"
        type="text"
        bind:value={userIdForRoleUpdate}
        class="users__input"
      />
      <label class="users__label" for="new-role">Ny roll:</label>
      <input
        id="new-role"
        type="text"
        bind:value={newRole}
        class="users__input"
      />
      <button
        class="users__button"
        onclick={async () => {
          await updateUserRole();
          await fetchUsers();
          await ResetFormdata();
        }}
      >
        Uppdatera roll
      </button>
    </section>
    <section class="users__section users__section--delete">
      <label class="users__label" for="delete-user">Ange användar-ID:</label>
      <input
        id="delete-user"
        type="text"
        bind:value={userIdToDelete}
        class="users__input"
      />
      <button
        class="users__button"
        onclick={async () => {
          await deleteUserById();
          await fetchUsers();
        }}
      >
        Ta bort användare
      </button>
    </section>
    <section class="users__section users__section--delete-all">
      <button
        class="users__button users__button--danger"
        onclick={async () => {
          await deleteAllUsers();
          await fetchUsers();
        }}
      >
        Ta bort alla användare
      </button>
    </section>
  </main>
{:else}
  <main>
    <h1>Åtkomst nekad</h1>
    <p>Du har inte behörighet att komma åt denna sida.</p>
  </main>
{/if}

<style>
  .users {
    display: grid;
    gap: 1rem;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: "Inter", sans-serif;
  }

  .users__header {
    background: linear-gradient(
      135deg,
      var(--primary-color) 40%,
      var(--neutral-color) 100%
    );
    text-align: center;
    padding: 1rem 0;
  }

  .users__title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--background-color);
  }

  .users__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--neutral-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .users__label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .users__input {
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

  .users__button {
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

  .users__button:hover {
    background: var(--secondary-accent-color);
    transform: translateY(-2px);
  }

  .users__button--danger {
    background: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    font-weight: 700;
    border-radius: 8px;
  }

  .users__button--danger:hover {
    background: var(--primary-color);
    color: var(--background-color);
  }
  .users__aside {
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

  .users__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .users__card {
    background: var(--primary-color);
    color: var(--background-color);
    border-radius: 8px;
    transition: transform 0.3s ease;
    cursor: pointer;
    text-align: center;
  }

  .users__card-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
