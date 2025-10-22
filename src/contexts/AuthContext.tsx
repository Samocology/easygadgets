import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginResponse } from '@/services/authService';
import { toast } from '@/components/ui/sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isNewUser?: boolean) => Promise<User>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to get current user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, isNewUser = false) => {
    const response = await authService.login(email, password);
    if (!response.user) {
      throw new Error("Login failed: Invalid response from server");
    }
    setUser(response.user);
    if (isNewUser) {
      toast(`Welcome, ${response.user?.name}!`);
    } else {
      toast(`Welcome Back, ${response.user?.name}!`);
    }
    return response.user;
  };

  const register = async (data: any) => {
    await authService.register(data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    await authService.verifyOtp(email, otp);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        forgotPassword,
        verifyOtp,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};