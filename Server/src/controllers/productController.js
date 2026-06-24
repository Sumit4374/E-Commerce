const { z } = require('zod');
const productService = require('../services/productService');
const {
  getProductsQuerySchema,
  createProductSchema,
  formatValidationError,
} = require('../validation/productValidation');

/**
 * GET /api/products
 * Get products with cursor pagination
 */
async function getProducts(req, res) {
  try {
    const validated = getProductsQuerySchema.parse({
      limit: req.query.limit,
      cursor: req.query.cursor,
      snapshotTime: req.query.snapshotTime,
      category: req.query.category,
    });

    const result = await productService.getProducts({
      limit: validated.limit,
      cursor: validated.cursor,
      snapshotTime: validated.snapshotTime,
      category: validated.category,
    });

    res.status(200).json({
      data: result.data,
      nextCursor: result.nextCursor,
      snapshotTime: result.snapshotTime,
      hasMore: result.hasMore,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: formatValidationError(error),
      });
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
      return res.status(400).json({
        error: 'Invalid product data',
        details: formatValidationError(error),
      });
    }
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getProducts,
  createProduct,
};
