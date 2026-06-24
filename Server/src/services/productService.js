let prisma;

function getPrisma() {
  if (!prisma) {
    prisma = require('../db/prisma');
  }
  return prisma;
}

/**
 * Fetch products with cursor pagination and snapshotTime
 * @param {Object} params
 * @param {number} params.limit - Number of items to return
 * @param {Object} params.cursor - Cursor object { updatedAt, id }
 * @param {string} params.snapshotTime - ISO timestamp string for snapshot
 * @param {string} params.category - Optional category filter
 * @returns {Object} { data, nextCursor, snapshotTime, hasMore }
 */
async function getProducts({ limit, cursor, snapshotTime, category }, client = getPrisma()) {
  // If snapshotTime is not provided, generate one (now)
  let snapTime = snapshotTime;
  if (!snapTime) {
    snapTime = new Date().toISOString();
  }

  // Build where clause for snapshot and category
  const where = {
    updatedAt: {
      lte: new Date(snapTime), // updatedAt <= snapshotTime
    },
    ...(category && { category }),
  };

  // If cursor is provided, add the keyset pagination condition
  if (cursor) {
    const cursorDate = new Date(cursor.updatedAt);
    where.AND = [
      {
        OR: [
          { updatedAt: { lt: cursorDate } },
          {
            updatedAt: { equals: cursorDate },
            id: { lt: cursor.id },
          },
        ],
      },
    ];
  }

  // Fetch limit + 1 items to determine if there is a next page
  const products = await client.product.findMany({
    where,
    orderBy: [
      { updatedAt: 'desc' },
      { id: 'desc' },
    ],
    take: limit + 1,
  });

  let hasMore = false;
  let nextCursor = null;
  const data = products.slice(0, limit); // Take only up to limit items

  if (products.length > limit) {
    hasMore = true;
    const lastProduct = data[limit - 1]; // The last item in the data set
    nextCursor = {
      updatedAt: lastProduct.updatedAt.toISOString(),
      id: lastProduct.id,
    };
  }

  return {
    data,
    nextCursor,
    snapshotTime: snapTime,
    hasMore,
  };
}

/**
 * Create a new product
 * @param {Object} productData
 * @returns {Object} Created product
 */
async function createProduct(productData, client = getPrisma()) {
  return await client.product.create({
    data: productData,
  });
}

module.exports = {
  getProducts,
  createProduct,
};
