import HomePage from "../pages/HomePage.svelte";
import OrderPage from "../pages/OrderPage.svelte";
import OrderHistory from "../pages/OrderHistory.svelte";
import About from "../pages/About.svelte";
import Contact from "../pages/Contact.svelte";
import Register from "../pages/Register.svelte";
import Login from "../pages/Login.svelte";
import ConfirmedOrders from "../pages/ConfirmedOrders.svelte";
import Admin from "../Admin/pages/Admin.svelte";
import AdminProducts from "../Admin/pages/AdminProducts.svelte";
import AdminUsers from "../Admin/pages/AdminUsers.svelte";
import AdminOrders from "../Admin/pages/AdminOrders.svelte";

export const routes = {
  "/": HomePage,
  "/Orderhistory": OrderHistory,
  "/Orderpage": OrderPage,
  "/About": About,
  "/Contact": Contact,
  "/Register": Register,
  "/Login": Login,
  "/ConfirmedOrders": ConfirmedOrders,
  "/Admin": Admin,
  "/AdminProducts": AdminProducts,
  "/AdminUsers": AdminUsers,
  "/AdminOrders": AdminOrders,
};

export const AdminRoutes = {
  "/Admin": Admin,
  "/AdminProducts": AdminProducts,
  "/AdminUsers": AdminUsers,
  "/AdminOrders": AdminOrders,
};
