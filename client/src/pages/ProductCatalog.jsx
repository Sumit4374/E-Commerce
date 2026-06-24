import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import SnapshotBanner from '../components/SnapshotBanner';
import ProductGrid from '../components/ProductGrid';
import LoadMoreButton from '../components/LoadMoreButton';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useProducts from '../hooks/useProducts.js';

const ProductCatalog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('catalog');
  const [category, setCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  // Perform local search filtering on the fetched products
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query) ||
      (product.category && product.category.toLowerCase().includes(query))
    );
  });

  // Formatted snapshot time
  const formattedSnapshotDate = snapshotTime
    ? new Date(snapshotTime).toISOString().replace('T', ' ').substring(0, 16)
    : 'Pending';

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content container */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header navbar */}
        <Navbar
          onMenuToggle={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalLoaded={products.length}
        />

        {/* Main page content area */}
        <main className="flex-1 mt-16 p-6 md:p-8 w-full max-w-[1440px] mx-auto overflow-y-auto overflow-x-hidden flex flex-col gap-6">
          
          {/* Snapshot Banner */}
          <SnapshotBanner snapshotTime={snapshotTime} />

          {/* Statistics Overview Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat Card 1: Total Products */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:border-secondary transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Products</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-[20px]">view_in_ar</span>
              </div>
              <div className="font-headline-lg text-headline-lg text-on-surface">204,512</div>
            </div>

            {/* Stat Card 2: Active Categories */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:border-secondary transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Active Categories</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-[20px]">category</span>
              </div>
              <div className="font-headline-lg text-headline-lg text-on-surface">5</div>
            </div>

            {/* Stat Card 3: Snapshot Timestamp */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:border-secondary transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Snapshot</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-[20px]">history</span>
              </div>
              <div className="font-body-md text-body-md text-on-surface font-medium truncate">{formattedSnapshotDate}</div>
            </div>

            {/* Stat Card 4: Loaded Items */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col justify-between hover:border-secondary transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Loaded</span>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors text-[20px]">downloading</span>
              </div>
              <div className="font-headline-lg text-headline-lg text-on-surface">{products.length}/200k+</div>
            </div>
          </section>

          {/* Filter Dashboard Section */}
          <CategoryFilter
            category={category}
            onChange={handleCategoryChange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onReset={() => {
              setCategory('All Categories');
              setSearchQuery('');
              reset();
            }}
          />

          {/* Content States (Error / Empty / Grid) */}
          {error && (
            <ErrorState 
              error={error} 
              onRetry={() => {
                reset();
                loadMore();
              }} 
            />
          )}

          {!error && filteredProducts.length === 0 && !loading && (
            <EmptyState />
          )}

          {!error && (
            <ProductGrid 
              products={filteredProducts} 
              loading={loading && products.length === 0} 
            />
          )}

          {/* Load More Controller */}
          <LoadMoreButton 
            onClick={loadMore} 
            loading={loading} 
            hasMore={hasMore} 
            loadedCount={products.length}
          />

        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;
