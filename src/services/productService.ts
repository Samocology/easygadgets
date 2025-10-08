import { api } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  stock: number;
  isNew?: boolean;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    
    const queryString = params.toString();
    return api.request(`/products${queryString ? `?${queryString}` : ''}`);
  },

  async getProductById(id: string): Promise<Product> {
    return api.request(`/products/${id}`);
  },

  async createProduct(productData: FormData): Promise<Product> {
    return api.uploadFile('/products', productData);
  },

  async updateProduct(id: string, productData: FormData): Promise<Product> {
    return api.uploadFile(`/products/${id}`, productData);
  },

  async deleteProduct(id: string): Promise<{ message: string }> {
    return api.request(`/products/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};
