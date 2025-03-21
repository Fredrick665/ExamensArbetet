export interface Treatments {
  name: string;
  description: string;
  time: string;
  cost: number;
  productId: string;
}

export interface CartItem extends Treatments {
  previousQuantity?: number;
  quantity: number;
  itemId: string;
}

export interface Order {
  items: CartItem[];
  total: number;
  username: string;
  orderId: string;
}

export interface User {
  userId: string;
  username: string;
  password: string;
  role: string;
}
