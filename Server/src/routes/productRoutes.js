const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products
router.get('/', productController.getProducts);

// POST /api/products
router.post('/', productController.createProduct);

// POST /api/seed - for seeding data (use with caution in production)
router.post('/seed', async (req, res) => {
  // In a real application, you might want to protect this endpoint
  // For example, only allow in development or with a secret token
  try {
    const prisma = require('../db/prisma');

    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
    const batchSize = 1000;
    const total = 200000;

    for (let i = 0; i < total; i += batchSize) {
      const batch = [];
      for (let j = 0; j < batchSize && i + j < total; j++) {
        const productId = i + j + 1;
        batch.push({
          name: `Product ${productId}`,
          category: categories[productId % categories.length],
          price: parseFloat((Math.random() * 100).toFixed(2)),
        });
      }

      await prisma.product.createMany({
        data: batch,
        skipDuplicates: true,
      });
    }

    res.status(200).json({ message: 'Seeding completed successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

module.exports = router;
