import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productApi.js';

const useProducts = (category, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snapshotTime, setSnapshotTime] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProductsData = useCallback(async ({ cursor = null, snapshot = null, replace = false } = {}) => {
    await Promise.resolve();

    setLoading(true);
    setError(null);
    if (replace) {
      setProducts([]);
      setNextCursor(null);
      setSnapshotTime(null);
      setHasMore(true);
    }

    try {
      const response = await fetchProducts({
        limit,
        cursor,
        snapshotTime: snapshot,
        category: category === 'All Categories' ? undefined : category,
      });

      // Ensure response.data is an array
      const data = Array.isArray(response.data) ? response.data : [];
      setProducts((prev) => {
        if (replace) {
          return data;
        }

        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNew = data.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });
      setSnapshotTime(response.snapshotTime);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        fetchProductsData({ replace: true });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [fetchProductsData]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchProductsData({ cursor: nextCursor, snapshot: snapshotTime });
    }
  }, [fetchProductsData, hasMore, loading, nextCursor, snapshotTime]);

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
