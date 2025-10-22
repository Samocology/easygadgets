import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cartService } from "@/services/cartService";
import { authService } from "@/services/authService";

// The local CartItem interface now includes productId
interface CartItem {
  id: string; // This is the unique ID for the cart item itself
  productId: string; // This is the ID of the product
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

// A more generic Product type for adding to cart
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => Promise<void>; // Use the generic Product type
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refreshCart = async () => {
    if (!authService.isAuthenticated()) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const cart = await cartService.getCart();
      // Correctly map the cart items from the backend based on the actual API response
      setItems(cart.items.map((item: any) => ({
        id: item._id, // Use the cart item's own ID from the backend
        productId: item.product._id, // Get the nested product ID
        name: item.product.name,
        price: item.product.price || 0,
        quantity: item.quantity,
        image: item.product.images[0], // Use the first image
        brand: item.product.brand || '', // Provide a fallback for brand
      })));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeCart = async () => {
      await refreshCart();
    };
    initializeCart();
  }, []);

  const addToCart = async (product: Product) => {
    if (!authService.isAuthenticated()) {
      toast({
        title: "Login required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // We call addToCart with the PRODUCT's ID
      await cartService.addToCart(product.id, 1);
      await refreshCart();
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      setLoading(true);
      const item = items.find(item => item.id === id);
      if (!item) {
        console.error('Item not found in local cart state');
        return;
      }
      // We call removeFromCart with the PRODUCT's ID, as the backend expects
      await cartService.removeFromCart(item.productId);
      await refreshCart();
      toast({
        title: "Item removed",
        description: `${item.name} has been removed from your cart`,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      setLoading(true);
      const item = items.find(item => item.id === id);
      if (!item) {
        // This should not happen if the UI is consistent
        console.error('Item not found in local cart state for update');
        return;
      }
      // We call updateCartItem with the PRODUCT's ID, as the backend expects
      await cartService.updateCartItem(item.productId, quantity);
      await refreshCart();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartService.clearCart();
      // After clearing on the backend, refresh the cart state
      await refreshCart(); 
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading,
      refreshCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    return {
      items: [],
      addToCart: async () => {},
      removeFromCart: async () => {},
      updateQuantity: async () => {},
      clearCart: async () => {},
      totalItems: 0,
      totalPrice: 0,
      loading: false,
      refreshCart: async () => {},
    };
  }
  return context;
};
