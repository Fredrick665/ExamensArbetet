<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes, AdminRoutes } from "./routes";
</script>

<Router {routes} {AdminRoutes} />
