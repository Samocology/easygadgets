import { api } from '@/lib/api';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    return api.request('/cart', { requiresAuth: true });
  },

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    return api.request('/cart', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateCartItem(productId: string, quantity: number): Promise<Cart> {
    return api.request(`/cart/item/${productId}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ quantity }),
    });
  },

  async removeFromCart(productId: string): Promise<Cart> {
    return api.request(`/cart/item/${productId}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  async clearCart(): Promise<{ message: string }> {
    const cart = await this.getCart();
    for (const item of cart.items) {
      await this.removeFromCart(item.productId);
    }
    return { message: 'Cart cleared' };
  },
};
