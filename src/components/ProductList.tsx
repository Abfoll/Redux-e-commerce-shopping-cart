import React from 'react';
import { useAppSelector, useCart, useCurrency } from '../store/hooks';

const ProductList: React.FC = () => {
  const products = useAppSelector((state) => state.products.items);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => {
        const formattedPrice = formatPrice(product.price);

        return (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain bg-white p-4"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formattedPrice}
                </span>
                <button
                  onClick={() => addItem(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
                >
                  <span className="mr-2" aria-hidden="true">🛒</span>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;