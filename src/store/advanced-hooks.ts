import { useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './index';
import { createSelector } from '@reduxjs/toolkit';
import { addToCart, removeFromCart } from './slices/cartSlice';
import { Product } from '../types';
import type { RootState } from './index';

// Memoized selectors
const selectCartItems = (state: RootState) => state.cart.items;
const selectCartTotal = (state: RootState) => state.cart.totalPrice;

const selectExpensiveItems = createSelector(
  [selectCartItems],
  (items) => items.filter(item => item.price > 100)
);

const selectItemsByCategory = createSelector(
  [selectCartItems, (_, category: string) => category],
  (items, category) => items.filter(item => item.category === category)
);

// Custom hook with memoization
export const useCartAnalytics = () => {
  const items = useAppSelector(selectCartItems);
  const expensiveItems = useAppSelector(selectExpensiveItems);
  
  const analytics = useMemo(() => {
    const categories = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalItems: items.length,
      expensiveItemsCount: expensiveItems.length,
      categoryDistribution: categories,
      averagePrice: items.reduce((sum, item) => sum + item.price, 0) / items.length || 0,
    };
  }, [items, expensiveItems]);
  
  return analytics;
};

// Custom hook for batch operations
export const useBatchCartOperations = () => {
  const dispatch = useAppDispatch();
  
  const addMultipleItems = useCallback((products: Product[]) => {
    products.forEach(product => {
      dispatch(addToCart(product));
    });
  }, [dispatch]);
  
  const removeMultipleItems = useCallback((ids: number[]) => {
    ids.forEach(id => {
      dispatch(removeFromCart(id));
    });
  }, [dispatch]);
  
  return { addMultipleItems, removeMultipleItems };
};