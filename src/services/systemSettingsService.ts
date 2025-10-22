import { api } from '@/lib/api';

export interface SystemSettings {
  storeName: string;
  currency: string;
  taxRate: string;
  shippingFee: string;
  emailNotifications: boolean;
  orderNotifications: boolean;
  lowStockAlert: boolean;
  autoBackup: boolean;
  maintenanceMode: boolean;
}

export const systemSettingsService = {
  async getSystemSettings(): Promise<SystemSettings> {
    return api.request('/settings', { requiresAuth: true });
  },

  async updateSystemSetting(key: string, value: any): Promise<void> {
    return api.request('/settings', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify({ key, value }),
    });
  },

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    const updates = Object.entries(settings).map(([key, value]) =>
      api.request('/settings', {
        method: 'PUT',
        requiresAuth: true,
        body: JSON.stringify({ key, value }),
      })
    );
    await Promise.all(updates);
    return this.getSystemSettings();
  },
};
