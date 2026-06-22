# Product Catalog API

A scalable product catalog API built with Node.js, Express, PostgreSQL, and Prisma ORM demonstrating correct pagination under heavy data volume.

## Features

- ✅ Cursor/Keyset pagination (no OFFSET) using `updatedAt` and `id` composite cursor
- ✅ SnapshotTime mechanism for consistent browsing sessions
- ✅ Category filtering compatible with pagination
- ✅ JWT-based authentication with bcryptjs password hashing
- ✅ Rate limiting to prevent abuse (100/15min general, 5/15min auth)
- ✅ Batch seeding for 200,000+ products
- ✅ Comprehensive API documentation with Swagger UI
- ✅ Centralized error handling and validation
- ✅ Clean architecture separation (routes → controllers → services → db)

## API Endpoints

### Public
- `GET /api/health` - Health check
- `POST /api/auth/login` - Authenticate and get JWT token

### Protected (Require Authorization: Bearer <token>)
- `GET /api/products?limit=10&cursor=...&snapshotTime=...&category=...` - Paginated product list
- `POST /api/products` - Create new product
- `POST /api/products/seed` - Seed database with sample data

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file (see `.env.example`)
4. Start server: `npm start` or `node src/index.js`
5. Access API at `http://localhost:3000`
6. View documentation: `http://localhost:3000/api-docs/`

## Testing

```bash
# Health check
curl http://localhost:3000/api/health

# Login (returns JWT token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'

# Use token to access protected endpoints
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/api/products?limit=10"
```

## Documentation

- Detailed implementation: `Docs/Progress.md`
- Final summary: `FINAL_SUMMARY.md`
- API docs: Swagger UI at `/api-docs/` when server is running

## License

MIT