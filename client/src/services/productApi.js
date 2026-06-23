import axios from 'axios';

const API_BASE_URL = import.meta.env.API_BASE_URL; // Adjust if your API is on a different base URL

// Mock data generator
const generateMockProducts = (limit, cursor = null) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = [];
      const startIndex = cursor ? parseInt(cursor.id) : 0;
      for (let i = 0; i < limit; i++) {
        const id = startIndex + i + 1;
        products.push({
          id: id.toString(),
          name: `Product ${id}`,
          category: ['Electronics', 'Books', 'Fashion', 'Sports', 'Home'][i % 5],
          price: (Math.random() * 100 + 10).toFixed(2),
          updatedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        });
      }

      const hasMore = startIndex + limit < 200000; // Simulate 200k+ products
      const nextCursor = hasMore
        ? {
          updatedAt: new Date(Date.now() - 1000).toISOString(),
          id: (startIndex + limit).toString(),
        }
        : null;

      resolve({
        data: products,
        nextCursor,
        snapshotTime: new Date().toISOString(),
        hasMore,
      });
    }, 500); // 500ms delay
  });
};

export const fetchProducts = async ({ limit, cursor, snapshotTime, category }) => {
  // If mock API is enabled, return mock data
  if (import.meta.env.VITE_USE_MOCK_API === 'true') {
    // Filter by category if provided (except 'All Categories')
    if (category && category !== 'All Categories') {
      // We'll filter after generating, but for simplicity, we'll just note that mock data includes all categories
      // In a real mock, we could filter, but for demo we'll ignore category in mock generation
      // and just note that the UI will show all categories
    }
    return await generateMockProducts(limit, cursor);
  }

  // Otherwise, call the real API
  const params = new URLSearchParams();
  if (params) params.append('limit', limit);
  if (cursor) {
    params.append('cursor[updatedAt]', cursor.updatedAt);
    params.append('cursor[id]', cursor.id);
  }
  if (snapshotTime) params.append('snapshotTime', snapshotTime);
  if (category) params.append('category', category);

  const response = await axios.get(`${API_BASE_URL}/products`, {
    params,
  });

  return response.data;
};

export default { fetchProducts };
