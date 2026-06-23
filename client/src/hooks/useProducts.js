import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productApi.js';

const useProducts = (category, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snapshotTime, setSnapshotTime] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts({
        limit,
        cursor: nextCursor,
        snapshotTime,
        category: category === 'All Categories' ? undefined : category,
      });

      // Ensure response.data is an array
      const data = Array.isArray(response.data) ? response.data : [];
      setProducts(prev => [...prev, ...data]);
      setSnapshotTime(response.snapshotTime);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  }, [category, limit, nextCursor, snapshotTime]);

  // Reset pagination when category changes
  useEffect(() => {
    setProducts([]);
    setNextCursor(null);
    setHasMore(true);
    fetchProductsData();
  }, [category]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchProductsData();
    }
  }, [hasMore, loading, fetchProductsData]);

  return {
    products,
    loading,
    error,
    snapshotTime,
    nextCursor,
    hasMore,
    loadMore,
    reset: () => {
      setProducts([]);
      setNextCursor(null);
      setHasMore(true);
      setSnapshotTime(null);
    }
  };
};

export default useProducts;
