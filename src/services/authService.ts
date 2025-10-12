import { api } from '@/lib/api';

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    phone?: string;
    address?: string;
  };
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // console.log('Login response:', response);

    // Transform the response to match expected structure
    const transformedResponse: LoginResponse = {
      token: response.token,
      user: {
        id: response._id,
        email: response.email,
        name: response.name,
        role: response.role,
      },
    };

    if (!transformedResponse.token || !transformedResponse.user) {
      console.error('Invalid response from server:', response);
      throw new Error('Invalid response from server: missing token or user');
    }

    localStorage.setItem('authToken', transformedResponse.token);
    localStorage.setItem('user', JSON.stringify(transformedResponse.user));

    return transformedResponse;
  },

  async register(data: RegisterData): Promise<{ message: string }> {
    return api.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async verifyOtp(email: string, otp: string): Promise<LoginResponse> {
    const response = await api.request<LoginResponse>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  async logout(): Promise<void> {
    try {
      await api.request('/auth/logout', {
        method: 'POST',
        requiresAuth: true,
      });
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    return api.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return api.request(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('authToken');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  },
};
