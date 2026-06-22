const { z } = require('zod');
const productService = require('../services/productService');

// Validation schemas
const getProductsSchema = z.object({
  limit: z.string().optional().default('10'),
  cursor: z.string().optional(), // JSON string of { updatedAt, id }
  snapshotTime: z.string().optional(),
  category: z.string().optional(),
});

const createProductSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
});

/**
 * GET /api/products
 * Get products with cursor pagination
 */
async function getProducts(req, res) {
  try {
    // Parse and validate query parameters
    const validated = getProductsSchema.parse({
      limit: req.query.limit,
      cursor: req.query.cursor,
      snapshotTime: req.query.snapshotTime,
      category: req.query.category,
    });

    const limit = parseInt(validated.limit, 10);
    const cursor = validated.cursor ? JSON.parse(validated.cursor) : undefined;
    const snapshotTime = validated.snapshotTime;
    const category = validated.category;

    // Fetch products from service
    const result = await productService.getProducts({
      limit,
      cursor,
      snapshotTime,
      category,
    });

    // Format response
    res.status(200).json({
      data: result.data,
      nextCursor: result.nextCursor,
      snapshotTime: result.snapshotTime,
      hasMore: result.hasMore,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid query parameters', details: error.errors });
    }
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * POST /api/products
 * Create a new product
 */
async function createProduct(req, res) {
  try {
    const validated = createProductSchema.parse(req.body);
    const product = await productService.createProduct(validated);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid product data', details: error.errors });
    }
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getProducts,
  createProduct,
};
