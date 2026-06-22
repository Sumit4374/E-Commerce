# Product Catalog API - Final Summary

## Overview
This project implements a scalable product catalog API using Node.js, Express, PostgreSQL (via Neon), and Prisma ORM. The API demonstrates correct pagination under heavy data volume (200,000+ products) using cursor/keyset pagination to avoid duplicates and missing records during concurrent operations.

## Features Implemented

### Core Functionality
- **Product Catalog API** with CRUD operations for products
- **Cursor/Keyset Pagination** using `updatedAt` and `id` composite cursor (no OFFSET)
- **SnapshotTime Mechanism** for consistent browsing sessions (prevents duplicates/missing records)
- **Category Filtering** that works correctly with pagination
- **Batch Seeding** capability for 200,000+ products (batch size: 1000)

### Technical Stack
- **Runtime**: Node.js v26.3.1
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon provider)
- **ORM**: Prisma v7.8.0
- **Validation**: Zod for input validation
- **Environment**: dotenv for configuration
- **Security**: bcryptjs for password hashing, JSON Web Tokens (JWT) for authentication
- **Rate Limiting**: express-rate-limit
- **Documentation**: Swagger UI/OpenAPI 3.0

### API Endpoints

#### Public Endpoints
- `GET /api/health` - Health check service
- `POST /api/auth/login` - Authenticate and receive JWT token

#### Protected Endpoints (Require JWT Bearer Token)
- `GET /api/products` - Get paginated list of products
  - Query Parameters:
    - `limit`: Number of items per page (1-100, default: 10)
    - `cursor`: Base64 encoded pagination cursor {updatedAt, id}
    - `snapshotTime`: ISO timestamp for consistent view
    - `category`: Filter by category
  - Returns: `{ data, nextCursor, snapshotTime, hasMore }`
- `POST /api/products` - Create a new product
- `POST /api/products/seed` - Seed database with 200,000+ sample products

### Key Technical Implementation Details

#### Prisma Configuration
- Used `@prisma/adapter-pg` for database connectivity (required for Prisma v7.8.0)
- Centralized Prisma instance in `src/db/prisma.js`
- Product model with indexes on `[updatedAt, id]` and `[category, updatedAt, id]` for optimal pagination performance

#### Authentication System
- JWT-based authentication
- Login endpoint validates credentials against environment variables
- Passwords secured with bcryptjs hashing
- Protected middleware verifies JWT tokens on `/api/products` routes
- Token expiration: 1 hour

#### Rate Limiting
- General limiter: 100 requests per 15 minutes for all endpoints
- Auth limiter: 5 login attempts per 15 minutes for `/api/auth/login`
- Proper rate limit headers returned: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`

#### Pagination Implementation
- Keyset pagination using `WHERE (updatedAt < cursorDate) OR (updatedAt = cursorDate AND id < cursorId)`
- Consistent ordering: `ORDER BY updatedAt DESC, id DESC`
- SnapshotTime ensures consistent view during pagination operations
- Fetches `limit + 1` items to determine if there are more pages
- Returns `nextCursor` as `{updatedAt, id}` of the last item in current page

#### Error Handling
- Centralized error handling middleware
- Input validation with zod (400 Bad Request for invalid inputs)
- Proper HTTP status codes (200, 201, 400, 401, 403, 404, 429, 500)
- Meaningful error messages without exposing internal details

### Verification & Testing
All core functionality was verified through manual testing:

1. **Health Check**: Returns `{"status":"OK","timestamp":"..."}`
2. **Authentication**:
   - Valid credentials return JWT token
   - Invalid credentials return 401
   - Protected endpoints return 401 without token, 403 with invalid token
3. **Rate Limiting**:
   - General endpoints show appropriate rate limit headers
   - Auth endpoint enforces 5/15min limit (returns 429 when exceeded)
4. **Pagination**:
   - Returns correct number of items based on limit
   - nextCursor correctly identifies next page
   - snapshotTime ensures consistent view across multiple requests
   - HasMore flag accurately indicates availability of more data
5. **Category Filtering**:
   - Works in combination with pagination and snapshotTime
   - Returns only products matching the specified category
6. **Seeding**:
   - Successfully populates database with 200,000+ products
   - Uses efficient batch inserts (1000 records per batch)
7. **Documentation**:
   - Swagger UI accessible at `/api-docs/`
   - Complete OpenAPI 3.0 specification with all endpoints documented

### Directory Structure
```
Server/
├── src/
│   ├── db/
│   │   └── prisma.js          # Prisma client instance
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   └── productRoutes.js   # Product routes (including seeding)
│   ├── services/
│   │   └── productService.js  # Business logic for products
│   └── index.js               # Express app entry point
├── swagger.yaml               # OpenAPI 3.0 specification
├── seed.js                    # Standalone seeding script
├── prisma/
│   └── schema.prisma          # Prisma schema definition
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

### Environment Variables
```
DATABASE_URL=postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require
PORT=3000
JWT_SECRET=your_jwt_secret_change_in_production
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=[bcrypt_hash_of_password]
```

### How to Run
1. Install dependencies: `npm install`
2. Set up environment variables in `.env` file
3. Start the server: `npm start` or `node src/index.js`
4. Access API at `http://localhost:3000`
5. View API documentation at `http://localhost:3000/api-docs/`
6. Authenticate: `POST /api/auth/login` with `{username:"admin",password:"your_password"}`
7. Use returned token in Authorization header: `Bearer <token>`

### Design Decisions & Trade-offs

#### Why Cursor Pagination over OFFSET?
- OFFSET pagination becomes slow with large offsets as it must skip rows
- Cursor pagination uses indexed columns for efficient lookups
- Prevents duplicates and missing records when data changes between pages
- More suitable for real-time data with frequent inserts/updates

#### Why SnapshotTime?
- Ensures consistent view during pagination operations
- Prevents seeing the same item twice or missing items when new records are added
- Critical for e-commerce/product catalogs where data consistency matters

#### Why Keyset (updatedAt, id) Compund Cursor?
- `updatedAt` alone can have duplicates (multiple items updated at same time)
- Adding `id` ensures unique identification and stable ordering
- Both columns are indexed for optimal query performance

#### Why Rate Limiting?
- Protects against brute force attacks on authentication
- Prevents API abuse and resource exhaustion
- Standard practice for public APIs

### Future Enhancements
- Refresh token flow for improved JWT security
- Role-based access control (RBAC)
- Advanced filtering and sorting options
- Caching layer (Redis) for improved performance
- Comprehensive test suite (unit, integration, end-to-end)
- Docker containerization for easy deployment
- CI/CD pipeline with automated testing
- Logging and monitoring integration
- API versioning strategy

## Conclusion
This implementation delivers a production-ready product catalog API that correctly handles pagination at scale while maintaining data consistency and security. The combination of cursor pagination with snapshotTime, proper authentication, rate limiting, and comprehensive documentation makes it suitable for real-world applications requiring reliable product browsing experiences.

All specified requirements have been met and verified through testing.