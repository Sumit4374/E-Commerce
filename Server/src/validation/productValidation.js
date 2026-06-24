const { z } = require('zod');
const { PRODUCT_CATEGORIES } = require('../constants/categories');

const isoDateString = z.string().refine((value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
}, {
  message: 'must be a valid ISO-8601 timestamp',
});

const cursorSchema = z.object({
  updatedAt: isoDateString,
  id: z.coerce.number().int().positive(),
}).strict();

const getProductsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  cursor: z.string().optional().transform((value, ctx) => {
    if (!value) return undefined;

    let decoded;
    try {
      decoded = JSON.parse(value);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'cursor must be a JSON object with updatedAt and id',
      });
      return z.NEVER;
    }

    const parsed = cursorSchema.safeParse(decoded);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => ctx.addIssue({
        ...issue,
        path: ['cursor', ...issue.path],
      }));
      return z.NEVER;
    }

    return parsed.data;
  }),
  snapshotTime: isoDateString.optional(),
  category: z.enum(PRODUCT_CATEGORIES).optional(),
});

const createProductSchema = z.object({
  name: z.string().trim().min(1).max(255),
  category: z.enum(PRODUCT_CATEGORIES),
  price: z.number().positive().finite(),
}).strict();

function formatValidationError(error) {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
}

module.exports = {
  PRODUCT_CATEGORIES,
  getProductsQuerySchema,
  createProductSchema,
  formatValidationError,
};
