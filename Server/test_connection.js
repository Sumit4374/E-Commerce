const prisma = require('./src/db/prisma');

async function main() {
  try {
    const count = await prisma.product.count();
    console.log('Product count:', count);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
