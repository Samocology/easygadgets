import { api } from '@/lib/api';
import { productService } from './productService';

export interface DashboardStats {
  totalRevenue: number;
  orderCount: number;
  topSellingProducts: any[];
  newCustomerMetrics: any;
  totalProducts: number;
  totalUsers: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [analyticsData, productsData, usersData] = await Promise.all([
    api.request('/analytics/dashboard', { requiresAuth: true }),
    productService.getProducts({ page: 1, limit: 1000 }),
    api.request('/users?page=1&limit=1000', { requiresAuth: true }), // Assuming backend supports pagination
  ]);

  return {
    ...(analyticsData as DashboardStats),
    totalProducts: productsData.total,
    totalUsers: Array.isArray(usersData) ? usersData.length : (usersData as any).total || 0,
  };
};
