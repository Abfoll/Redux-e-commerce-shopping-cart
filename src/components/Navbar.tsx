import React from 'react';
import { useAppSelector, useUser } from '../store/hooks';

const Navbar: React.FC = () => {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const { theme, toggleTheme, setCurrency, currency } = useUser();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="h-8 w-8 text-blue-500 text-2xl" aria-hidden="true">🛒</span>
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              ShopSmart
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR' | 'GBP')}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'light' ? <span aria-hidden="true">🌙</span> : <span className="text-yellow-400" aria-hidden="true">☀️</span>}
            </button>

            {/* Cart Icon with Badge */}
            <div className="relative">
              <span className="h-6 w-6 text-gray-700 dark:text-gray-300 text-xl" aria-hidden="true">🛒</span>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;