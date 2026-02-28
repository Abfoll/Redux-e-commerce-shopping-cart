import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useProducts } from './store/hooks';

// Inner component with hooks
const AppContent: React.FC = () => {
  const { fetchProducts, loading, error } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;