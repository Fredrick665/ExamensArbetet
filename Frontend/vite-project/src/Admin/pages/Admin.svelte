<script lang="ts">
  import AdminMenu from "../components/AdminMenu.svelte";
  let isAdmin = $state(false);

  $effect(() => {
    const role = sessionStorage.getItem("userRole");
    if (role === "admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  });
</script>

{#if isAdmin}
  <main class="admin-container">
    <h1 class="admin-title">Admin Panel</h1>
    <section class="admin-menu">
      <AdminMenu />
    </section>
  </main>
{:else}
  <main>
    <h1>Åtkomst nekad</h1>
    <p>Du har inte behörighet att komma åt denna sida.</p>
  </main>
{/if}

<style>
  .admin-container {
    display: flex;
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: "Inter", sans-serif;
    height: 100vh;
    flex-direction: column;
  }

  .admin-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--background-color);
    text-align: center;
    background: linear-gradient(
      135deg,
      var(--primary-color) 40%,
      var(--neutral-color) 100%
    );
    padding: 1rem 0;
    margin-bottom: 1rem;
  }

  .admin-menu {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    background-color: var(--neutral-color);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 220px;
  }
</style>
