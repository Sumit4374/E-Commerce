const test = require('node:test');
const assert = require('node:assert/strict');
const { getProducts } = require('../src/services/productService');

function createFakePrisma(products) {
  return {
    product: {
      async findMany({ where, orderBy, take }) {
        assert.deepEqual(orderBy, [
          { updatedAt: 'desc' },
          { id: 'desc' },
        ]);

        return products
          .filter((product) => matchesWhere(product, where))
          .sort((left, right) => {
            const byUpdatedAt = right.updatedAt.getTime() - left.updatedAt.getTime();
            if (byUpdatedAt !== 0) return byUpdatedAt;
            return right.id - left.id;
          })
          .slice(0, take);
      },
    },
  };
}

function matchesWhere(product, where) {
  if (where.category && product.category !== where.category) {
    return false;
  }

  if (where.updatedAt?.lte && product.updatedAt > where.updatedAt.lte) {
    return false;
  }

  if (!where.AND) {
    return true;
  }

  return where.AND.every((condition) => {
    if (!condition.OR) return true;

    return condition.OR.some((orCondition) => {
      if (orCondition.updatedAt?.lt) {
        return product.updatedAt < orCondition.updatedAt.lt;
      }

      if (orCondition.updatedAt?.equals && orCondition.id?.lt) {
        return product.updatedAt.getTime() === orCondition.updatedAt.equals.getTime()
          && product.id < orCondition.id.lt;
      }

      return false;
    });
  });
}

function product(id, updatedAt, category = 'Books') {
  return {
    id,
    name: `Product ${id}`,
    category,
    price: 10,
    createdAt: updatedAt,
    updatedAt,
  };
}

test('keyset pagination is stable when products share identical timestamps', async () => {
  const snapshotTime = '2026-01-01T00:00:00.000Z';
  const timestamp = new Date(snapshotTime);
  const products = Array.from({ length: 30 }, (_, index) => product(index + 1, timestamp));
  const client = createFakePrisma(products);

  const firstPage = await getProducts({ limit: 10, snapshotTime }, client);
  const secondPage = await getProducts({
    limit: 10,
    snapshotTime: firstPage.snapshotTime,
    cursor: firstPage.nextCursor,
  }, client);

  assert.deepEqual(firstPage.data.map((item) => item.id), [30, 29, 28, 27, 26, 25, 24, 23, 22, 21]);
  assert.deepEqual(secondPage.data.map((item) => item.id), [20, 19, 18, 17, 16, 15, 14, 13, 12, 11]);
  assert.equal(new Set([...firstPage.data, ...secondPage.data].map((item) => item.id)).size, 20);
});

test('snapshotTime prevents duplicate records after concurrent inserts', async () => {
  const snapshotTime = '2026-01-01T00:00:00.000Z';
  const beforeSnapshot = new Date(snapshotTime);
  const afterSnapshot = new Date('2026-01-01T00:00:01.000Z');

  const originalProducts = Array.from({ length: 30 }, (_, index) => product(index + 1, beforeSnapshot));
  const client = createFakePrisma([...originalProducts]);

  const firstPage = await getProducts({ limit: 10, snapshotTime }, client);

  client.product.findMany = createFakePrisma([
    ...originalProducts,
    ...Array.from({ length: 50 }, (_, index) => product(index + 31, afterSnapshot)),
  ]).product.findMany;

  const secondPage = await getProducts({
    limit: 10,
    snapshotTime: firstPage.snapshotTime,
    cursor: firstPage.nextCursor,
  }, client);

  const loadedIds = [...firstPage.data, ...secondPage.data].map((item) => item.id);

  assert.deepEqual(firstPage.data.map((item) => item.id), [30, 29, 28, 27, 26, 25, 24, 23, 22, 21]);
  assert.deepEqual(secondPage.data.map((item) => item.id), [20, 19, 18, 17, 16, 15, 14, 13, 12, 11]);
  assert.equal(new Set(loadedIds).size, loadedIds.length);
  assert.equal(loadedIds.some((id) => id > 30), false);
});

test('category filter combines with cursor pagination', async () => {
  const snapshotTime = '2026-01-01T00:00:00.000Z';
  const timestamp = new Date(snapshotTime);
  const products = [
    product(1, timestamp, 'Books'),
    product(2, timestamp, 'Books'),
    product(3, timestamp, 'Sports'),
    product(4, timestamp, 'Books'),
  ];
  const client = createFakePrisma(products);

  const result = await getProducts({ limit: 2, snapshotTime, category: 'Books' }, client);

  assert.deepEqual(result.data.map((item) => item.id), [4, 2]);
  assert.equal(result.hasMore, true);
  assert.deepEqual(result.nextCursor, {
    updatedAt: snapshotTime,
    id: 2,
  });
});
