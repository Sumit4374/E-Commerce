import React from 'react';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import SnapshotBanner from '../components/SnapshotBanner';
import ProductGrid from '../components/ProductGrid';
import LoadMoreButton from '../components/LoadMoreButton';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useProducts from '../hooks/useProducts.js';

const ProductCatalog = () => {
  const [category, setCategory] = React.useState('All Categories');
  const {
    products,
    loading,
    error,
    snapshotTime,
    hasMore,
    loadMore,
    reset
  } = useProducts(category);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // The useProducts hook will reset when category changes due to the dependency array
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter category={category} onChange={handleCategoryChange} />
          <SnapshotBanner snapshotTime={snapshotTime} />
          {error && (
            <ErrorState 
              error={error} 
              onRetry={() => {
                reset();
                loadMore();
              }} 
            />
          )}
          {!error && products.length === 0 && !loading && (
            <EmptyState />
          )}
          <ProductGrid products={products} loading={loading} />
          <LoadMoreButton onClick={loadMore} loading={loading} hasMore={hasMore} />
        </div>
      </main>
    </div>
  );
};

export default ProductCatalog;
