import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice';
import { CartState } from '../../../types';

describe('cart slice', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 100 },
  };

  const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };

  test('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addToCart', () => {
    const actual = cartReducer(initialState, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(1);
    expect(actual.totalQuantity).toBe(1);
    expect(actual.totalPrice).toBe(99.99);
  });

  test('should handle removeFromCart', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockProduct));
    const actual = cartReducer(stateWithItem, removeFromCart(1));
    expect(actual.items).toHaveLength(0);
    expect(actual.totalQuantity).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });

  test('should handle updateQuantity', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockProduct));
    const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 3 }));
    expect(actual.items[0].quantity).toBe(3);
    expect(actual.totalQuantity).toBe(3);
    expect(actual.totalPrice).toBeCloseTo(299.97, 2);
  });

  test('should handle clearCart', () => {
    const stateWithItem = cartReducer(initialState, addToCart(mockProduct));
    const actual = cartReducer(stateWithItem, clearCart());
    expect(actual.items).toHaveLength(0);
    expect(actual.totalQuantity).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });
});
