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

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    return api.request(`/cart/item/${itemId}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ quantity }),
    });
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    return api.request(`/cart/item/${itemId}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  async clearCart(): Promise<{ message: string }> {
    const cart = await this.getCart();
    for (const item of cart.items as any[]) {
      // Pass the correct productId from the nested product object
      await this.removeFromCart(item.product._id);
    }
    return { message: 'Cart cleared' };
  },
};