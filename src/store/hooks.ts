import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './index';
import { addToCart, removeFromCart, updateQuantity, clearCart } from './slices/cartSlice';
import { fetchProducts } from './slices/productsSlice';
import { toggleTheme, setCurrency } from './slices/userSlice';
import { Product, UserState } from '../types';

export { useAppSelector };

// Custom hook for cart operations
export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const addItem = useCallback((product: Product) => dispatch(addToCart(product)), [dispatch]);
  const removeItem = useCallback((id: number) => dispatch(removeFromCart(id)), [dispatch]);
  const updateItemQuantity = useCallback(
    (id: number, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    [dispatch]
  );
  const clearAllItems = useCallback(() => dispatch(clearCart()), [dispatch]);

  return {
    ...cart,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart: clearAllItems,
  };
};

// Custom hook for products
export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);
  const loadProducts = useCallback(() => dispatch(fetchProducts()), [dispatch]);

  return {
    products: items,
    loading,
    error,
    fetchProducts: loadProducts,
  };
};

// Custom hook for user preferences
export const useUser = () => {
  const dispatch = useAppDispatch();
  const { currency, theme } = useAppSelector((state) => state.user);
  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const handleSetCurrency = useCallback(
    (curr: UserState['currency']) => dispatch(setCurrency(curr)),
    [dispatch]
  );

  return {
    currency,
    theme,
    toggleTheme: handleToggleTheme,
    setCurrency: handleSetCurrency,
  };
};

// Custom hook for currency conversion
export const useCurrency = () => {
  const { currency } = useUser();
  
  const rates: Record<UserState['currency'], number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
  };
  
  const formatPrice = (price: number) => {
    const convertedPrice = price * rates[currency];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice);
  };

  return { formatPrice };
};