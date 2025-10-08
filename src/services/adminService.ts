import { api } from '@/lib/api';

export interface DashboardStats {
  revenue: number;
  orders: number;
  customers: number;
  pageViews: number;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const adminService = {
  async getDashboardStats(): Promise<DashboardStats> {
    return api.request('/analytics/dashboard', { requiresAuth: true });
  },

  async getProfile(): Promise<AdminProfile> {
    return api.request('/admin/profile', { requiresAuth: true });
  },

  async updateProfile(data: Partial<AdminProfile>): Promise<AdminProfile> {
    return api.request('/admin/profile', {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(data),
    });
  },

  async getUsers(): Promise<User[]> {
    return api.request('/users', { requiresAuth: true });
  },

  async deleteUser(userId: string): Promise<{ message: string }> {
    return api.request(`/users/${userId}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },

  async updateAvatar(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return api.uploadFile('/users/avatar', formData);
  },
};
