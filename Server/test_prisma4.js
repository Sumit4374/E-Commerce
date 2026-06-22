require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });
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
