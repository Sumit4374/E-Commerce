require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { requiredEnv } = require('../config/env');

const adapter = new PrismaPg({ connectionString: requiredEnv('DATABASE_URL') });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
