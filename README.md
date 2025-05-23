# Nest Web API

A simple NestJS REST API for managing catalogs and products, fully documented with Swagger.

---

## Features

- CRUD for **Catalogs** and **Products**
- List products by catalog (`GET /catalogs/:catalogId/products`)
- In-memory mock data (no database required)
- Input validation with `class-validator`
- Full Swagger/OpenAPI documentation at `/swagger`
- Clear error responses with schemas

---

## Getting Started

### 1. **Install dependencies**

```bash
$ npm install
```

## 2. Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 3. Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Catalogs
- `GET /catalogs` — List all catalogs
- `GET /catalogs/:id` — Get catalog by ID
- `POST /catalogs` — Create a catalog
- `PUT /catalogs/:id` — Update a catalog
- `DELETE /catalogs/:id` — Delete a catalog

### Products
- `GET /products` — List all products
- `GET /products/:id` — Get product by ID
- `GET /products/catalog/:catalogId` — List products for a catalog
- `POST /products` — Create a product
- `PUT /products/:id` — Update a product
- `DELETE /products/:id` — Delete a product

## API Documentation

- Interactive Swagger UI: [http://localhost:3000/swagger](http://localhost:3000/swagger)
- All endpoints, request/response schemas, and error responses are documented.

## Notes

- The app uses in-memory mock data. Restarting the server resets all data.
- Example values in Swagger are set so you can try requests without changing anything.
- No authentication is required.

## License

[MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
