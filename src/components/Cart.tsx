import React from 'react';
import { useCart, useCurrency } from '../store/hooks';

const Cart: React.FC = () => {
  const { items, totalQuantity, totalPrice, removeItem, updateItemQuantity, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const totalFormatted = formatPrice(totalPrice);

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <div className="h-16 w-16 mx-auto text-gray-400 mb-4 text-5xl" aria-hidden="true">🛍️</div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add some products to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Shopping Cart ({totalQuantity} items)
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {items.map((item) => {
          const formattedPrice = formatPrice(item.price * item.quantity);
          
          return (
            <div key={item.id} className="flex items-center space-x-4 border-b dark:border-gray-700 pb-4">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formattedPrice}
                </p>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                  >
                    <span aria-hidden="true">−</span>
                  </button>
                  <span className="w-8 text-center text-gray-800 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <span aria-hidden="true">🗑️</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="mt-6 pt-4 border-t dark:border-gray-700">
        <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-white">
          <span>Total:</span>
          <span className="text-blue-600 dark:text-blue-400">
            {totalFormatted}
          </span>
        </div>
        
        <div className="flex space-x-4 mt-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;