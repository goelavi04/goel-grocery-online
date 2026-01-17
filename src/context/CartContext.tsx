import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from database when user logs in
  const loadCartFromDB = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        const items: CartItem[] = data.map(item => ({
          id: item.product_id,
          name: item.product_name,
          price: Number(item.product_price),
          image: item.product_image || '',
          category: item.product_category || '',
          unit: item.product_unit || '',
          quantity: item.quantity,
        }));
        setCartItems(items);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadCartFromDB();
    } else {
      // Load from localStorage for guest users
      const saved = localStorage.getItem('goel-cart');
      setCartItems(saved ? JSON.parse(saved) : []);
    }
  }, [user, loadCartFromDB]);

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('goel-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const syncCartToDB = async (items: CartItem[]) => {
    if (!user) return;

    try {
      // Delete all existing cart items for this user
      await supabase.from('cart_items').delete().eq('user_id', user.id);

      // Insert new items
      if (items.length > 0) {
        const cartData = items.map(item => ({
          user_id: user.id,
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          product_image: item.image,
          product_category: item.category,
          product_unit: item.unit,
          quantity: item.quantity,
        }));

        await supabase.from('cart_items').insert(cartData);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newItems: CartItem[];
      
      if (existing) {
        newItems = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev, { ...product, quantity: 1 }];
      }
      
      if (user) {
        syncCartToDB(newItems);
      }
      
      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.id !== productId);
      if (user) {
        syncCartToDB(newItems);
      }
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => {
      const newItems = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      if (user) {
        syncCartToDB(newItems);
      }
      return newItems;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem('goel-cart');
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
