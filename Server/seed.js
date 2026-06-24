require('dotenv').config();
const prisma = require('./src/db/prisma');
const { PRODUCT_CATEGORIES } = require('./src/constants/categories');

async function main() {
  console.log('Starting seed...');
  
  // Clear existing products (optional)
  // await prisma.product.deleteMany({});
  
  // Generate 200,000 products in batches
  const batchSize = 1000;
  const total = 200000;
  
  for (let i = 0; i < total; i += batchSize) {
    const batch = [];
    for (let j = 0; j < batchSize && i + j < total; j++) {
      const productId = i + j + 1;
      batch.push({
        name: `Product ${productId}`,
        category: PRODUCT_CATEGORIES[productId % PRODUCT_CATEGORIES.length],
        price: parseFloat((Math.random() * 100).toFixed(2)),
      });
    }
    
    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true, // In case of unique constraints, but we don't have any on name/category
    });
    
    console.log(`Seeded ${Math.min(i + batchSize, total)} / ${total} products`);
  }
  
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
