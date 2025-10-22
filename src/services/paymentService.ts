import { api } from '@/lib/api';

export interface InitiatePaymentResponse {
  authorization_url: string;
  transactionReference: string;
}

export const paymentService = {
  async initiatePayment(orderId: string, paymentMethod: string): Promise<InitiatePaymentResponse> {
    return api.request(`/payment/initiate`, {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify({ orderId }),
    });
  },
};
