import { api } from '@/lib/api';

export interface Product {
  _id: string;
  id?: string;
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
    const response = await api.request<ProductListResponse>(`/products${queryString ? `?${queryString}` : ''}`);

    // Normalize products to ensure category is always a string, image is set, and inStock is based on stock
    const normalizedProducts = response.products.map(product => ({
      ...product,
      id: product._id,
      category: typeof product.category === 'object' && product.category !== null
        ? (product.category as any).name || ''
        : (product.category || ''),
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
      inStock: product.stock > 0
    }));

    return {
      ...response,
      products: normalizedProducts
    };
  },

  async getProductById(id: string): Promise<Product> {
    const product = await api.request<Product>(`/products/${id}`);

    // Normalize category to string, ensure image is set, and set inStock based on stock
    return {
      ...product,
      id: product._id,
      category: typeof product.category === 'object' && product.category !== null
        ? (product.category as any).name || ''
        : (product.category || ''),
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
      inStock: product.stock > 0
    };
  },

  async createProduct(productData: FormData): Promise<Product> {
    const product = await api.uploadFile('/products', productData);
    return {
      ...product,
      id: product._id,
      category: typeof product.category === 'object' && product.category !== null
        ? (product.category as any).name || ''
        : (product.category as string || ''),
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
      inStock: product.stock > 0
    };
  },

  async updateProduct(id: string, productData: FormData): Promise<Product> {
    const product = await api.uploadFile(`/products/${id}`, productData);
    return {
      ...product,
      id: product._id,
      category: typeof product.category === 'object' && product.category !== null
        ? (product.category as any).name || ''
        : (product.category as string || ''),
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
      inStock: product.stock > 0
    };
  },

  async deleteProduct(id: string): Promise<{ message: string }> {
    return api.request(`/products/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};
