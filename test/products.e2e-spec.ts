import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  catalogId: number;
};

describe("Products (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/products (GET) should return all products", async () => {
    const res = await request(app.getHttpServer()).get("/products");
    const products = res.body as Product[];

    expect(res.status).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("/products/:id (GET) should return a product by id", async () => {
    const res = await request(app.getHttpServer()).get("/products/1");
    const product = res.body as Product;

    expect(res.status).toBe(200);
    expect(product).toHaveProperty("id", 1);
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("catalogId");
  });

  it("/products/:id (GET) should return 404 for non-existent product", async () => {
    const res = await request(app.getHttpServer()).get("/products/99999");

    expect(res.status).toBe(404);
  });

  it("/products (POST) should create a new product", async () => {
    const res = await request(app.getHttpServer()).post("/products").send({
      name: "Test Product",
      description: "A test product",
      price: 123.45,
      catalogId: 1,
    });

    const product = res.body as Product;

    expect(res.status).toBe(201);
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name", "Test Product");
    expect(product).toHaveProperty("price", 123.45);
    expect(product).toHaveProperty("catalogId", 1);
  });

  it("/products/:id (PUT) should update a product", async () => {
    // First, create a product to update
    const createRes = await request(app.getHttpServer())
      .post("/products")
      .send({
        name: "Product To Update",
        description: "desc",
        price: 10,
        catalogId: 1,
      });
    const { id } = createRes.body as Product;

    const updateRes = await request(app.getHttpServer())
      .put(`/products/${id}`)
      .send({
        name: "Updated Product",
        description: "updated desc",
        price: 20,
        catalogId: 1,
      });

    const updatedProduct = updateRes.body as Product;

    expect(updateRes.status).toBe(200);
    expect(updatedProduct).toHaveProperty("name", "Updated Product");
    expect(updatedProduct).toHaveProperty("price", 20);
    expect(updatedProduct).toHaveProperty("id", id);
  });

  it("/products/:id (PUT) should fail if required fields are missing", async () => {
    // First, create a product to update
    const createRes = await request(app.getHttpServer())
      .post("/products")
      .send({
        name: "Product To Update",
        description: "desc",
        price: 10,
        catalogId: 1,
      });
    const { id } = createRes.body as Product;

    // Missing required fields
    const updateRes = await request(app.getHttpServer())
      .put(`/products/${id}`)
      .send({});

    expect(updateRes.status).toBe(400);
  });

  it("/products/:id (DELETE) should remove a product", async () => {
    // First, create a product to delete
    const createRes = await request(app.getHttpServer())
      .post("/products")
      .send({
        name: "Product To Delete",
        description: "desc",
        price: 10,
        catalogId: 1,
      });
    const { id } = createRes.body as Product;

    const deleteRes = await request(app.getHttpServer()).delete(
      `/products/${id}`,
    );

    const deletedProduct = deleteRes.body as Product;

    expect(deleteRes.status).toBe(200);
    expect(deletedProduct).toHaveProperty("id", id);

    // Confirm it's deleted
    const getRes = await request(app.getHttpServer()).get(`/products/${id}`);

    expect(getRes.status).toBe(404);
  });

  it("/products/catalog/:catalogId (GET) should return products by catalog", async () => {
    const res = await request(app.getHttpServer()).get("/products/catalog/1");
    const products = res.body as Product[];

    expect(res.status).toBe(200);
    expect(Array.isArray(products)).toBe(true);

    products.forEach((product) => {
      expect(product.catalogId).toBe(1);
    });
  });
});
