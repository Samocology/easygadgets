import { api } from '@/lib/api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'alert' | 'info';
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
}

export const notificationService = {
  async getNotifications(page: number = 1, limit: number = 20): Promise<NotificationsResponse> {
    const response = await api.request<NotificationsResponse>(`/notifications?page=${page}&limit=${limit}`, { requiresAuth: true });
    const normalizedNotifications = response.notifications.map(n => ({ ...n, id: (n as any)._id }));
    return { ...response, notifications: normalizedNotifications };
  },

  async markAsRead(notificationId: string): Promise<void> {
    return api.request(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
      requiresAuth: true,
    });
  },

  async markAllAsRead(): Promise<void> {
    return api.request('/notifications/mark-all-read', {
      method: 'PATCH',
      requiresAuth: true,
    });
  },
};
