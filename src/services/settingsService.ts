import { api } from '@/lib/api';

export interface UserSettings {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
}

export const settingsService = {
  async getSettings(): Promise<UserSettings> {
    return api.request('/settings', { requiresAuth: true });
  },

  async updateSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    return api.request('/settings', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  },

  async toggleEmailNotifications(enabled: boolean): Promise<UserSettings> {
    return api.request('/settings/notifications/email', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ enabled }),
    });
  },

  async toggleSmsNotifications(enabled: boolean): Promise<UserSettings> {
    return api.request('/settings/notifications/sms', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ enabled }),
    });
  },
};
