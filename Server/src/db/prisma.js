require('dotenv').config();
const { PrismaClient } = require('../../generated/prisma/client');
const prisma = new PrismaClient({ url: process.env.DATABASE_URL });
module.exports = prisma;
