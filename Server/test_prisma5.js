require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Looking for prisma.config.ts:', require('fs').existsSync('./prisma/config.ts'));
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
