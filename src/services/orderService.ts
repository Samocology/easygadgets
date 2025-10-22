import { api } from '@/lib/api';

export interface Order {
  _id: string;
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

export interface CreateOrderData {
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  total: number;
}

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<Order> {
    return api.request('/orders', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  },

  async getMyOrders(): Promise<Order[]> {
    return api.request('/orders/my-orders', { requiresAuth: true });
  },

  async getAllOrders(status?: string): Promise<Order[]> {
    const params = status ? `?status=${status}` : '';
    return api.request(`/orders${params}`, { requiresAuth: true });
  },

  async getOrderById(orderId: string): Promise<Order> {
    return api.request(`/orders/${orderId}`, { requiresAuth: true });
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return api.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ status }),
    });
  },

  async verifyPayment(reference: string): Promise<{ success: boolean; orderId?: string }> {
    return api.request('/payments/verify', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify({ reference }),
    });
  },
};
