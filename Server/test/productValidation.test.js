const test = require('node:test');
const assert = require('node:assert/strict');
const { z } = require('zod');
const {
  getProductsQuerySchema,
  createProductSchema,
} = require('../src/validation/productValidation');

test('getProductsQuerySchema parses valid pagination parameters', () => {
  const parsed = getProductsQuerySchema.parse({
    limit: '20',
    category: 'Books',
    snapshotTime: '2026-01-01T00:00:00.000Z',
    cursor: JSON.stringify({
      updatedAt: '2026-01-01T00:00:00.000Z',
      id: '42',
    }),
  });

  assert.equal(parsed.limit, 20);
  assert.equal(parsed.category, 'Books');
  assert.equal(parsed.snapshotTime, '2026-01-01T00:00:00.000Z');
  assert.deepEqual(parsed.cursor, {
    updatedAt: '2026-01-01T00:00:00.000Z',
    id: 42,
  });
});

test('getProductsQuerySchema rejects invalid pagination input', () => {
  assert.throws(() => getProductsQuerySchema.parse({ limit: '0' }), z.ZodError);
  assert.throws(() => getProductsQuerySchema.parse({ limit: '101' }), z.ZodError);
  assert.throws(() => getProductsQuerySchema.parse({ category: 'Fashion' }), z.ZodError);
  assert.throws(() => getProductsQuerySchema.parse({ snapshotTime: 'not-a-date' }), z.ZodError);
  assert.throws(() => getProductsQuerySchema.parse({ cursor: '{bad-json' }), z.ZodError);
  assert.throws(() => getProductsQuerySchema.parse({
    cursor: JSON.stringify({ updatedAt: '2026-01-01T00:00:00.000Z' }),
  }), z.ZodError);
});

test('createProductSchema validates category and positive price', () => {
  const parsed = createProductSchema.parse({
    name: 'Desk Lamp',
    category: 'Home & Garden',
    price: 29.99,
  });

  assert.equal(parsed.name, 'Desk Lamp');
  assert.equal(parsed.category, 'Home & Garden');
  assert.equal(parsed.price, 29.99);

  assert.throws(() => createProductSchema.parse({
    name: 'Desk Lamp',
    category: 'Home',
    price: 29.99,
  }), z.ZodError);

  assert.throws(() => createProductSchema.parse({
    name: 'Desk Lamp',
    category: 'Home & Garden',
    price: -1,
  }), z.ZodError);
});
