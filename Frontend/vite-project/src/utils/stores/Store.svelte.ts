import type { Treatments, CartItem, Order } from "../interfaces";

export const cart = $state<CartItem[]>([]);
export const previousOrders = $state<Order[]>([]);

export function updateCart(
  treatment: Treatments,
  action: "add" | "increase" | "decrease"
): void {
  const index = cart.findIndex((item) => item.name === treatment.name);

  if (action === "add") {
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        ...treatment,
        quantity: 1,
        previousQuantity: 0,
        itemId: "",
      });
    }
  } else if (action === "increase" && index !== -1) {
    cart[index].quantity += 1;
  } else if (action === "decrease" && index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
  }
}
export async function finalizeOrder(): Promise<void> {
  const token = sessionStorage.getItem("jwt");

  if (!token) {
    alert("Du måste vara inloggad för att göra en order.");
    return;
  }
  if (cart.length === 0) {
    alert("Din kundvagn är tom.");
    return;
  }

  const orderData = {
    items: cart.map((item: CartItem) => ({
      name: item.name,
      cost: item.cost,
      quantity: item.quantity,
    })),
  };

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Fel vid skapande av order: " + errorData.message);
      return;
    }
    cart.length = 0;
    alert("Beställning genomförd!");
  } catch (error) {
    alert("Något gick fel vid ordern.");
  }
}
