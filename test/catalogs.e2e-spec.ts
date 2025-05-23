import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

type Catalog = {
  id: number;
  name: string;
};

describe("Catalogs (e2e)", () => {
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

  it("/catalogs (GET) should return all catalogs", async () => {
    const res = await request(app.getHttpServer()).get("/catalogs");
    const catalogs = res.body as Catalog[];

    expect(res.status).toBe(200);
    expect(Array.isArray(catalogs)).toBe(true);
    expect(catalogs.length).toBeGreaterThan(0);
  });

  it("/catalogs/:id (GET) should return a catalog by id", async () => {
    const res = await request(app.getHttpServer()).get("/catalogs/1");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
  });

  it("/catalogs/:id (GET) should return 404 for non-existent catalog", async () => {
    const res = await request(app.getHttpServer()).get("/catalogs/99999");

    expect(res.status).toBe(404);
  });

  it("/catalogs (POST) should create a new catalog", async () => {
    const res = await request(app.getHttpServer())
      .post("/catalogs")
      .send({ name: "Test Catalog" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Test Catalog");
  });

  it("/catalogs/:id (PUT) should update a catalog with full object", async () => {
    // First, create a catalog to update
    const createRes = await request(app.getHttpServer())
      .post("/catalogs")
      .send({ name: "Catalog To Update" });
    const { id } = createRes.body as Catalog;

    // PUT requires the full object (name)
    const updateRes = await request(app.getHttpServer())
      .put(`/catalogs/${id}`)
      .send({ name: "Updated Catalog Name" });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty("name", "Updated Catalog Name");
    expect(updateRes.body).toHaveProperty("id", id);
  });

  it("/catalogs/:id (PUT) should fail if required fields are missing", async () => {
    // First, create a catalog to update
    const createRes = await request(app.getHttpServer())
      .post("/catalogs")
      .send({ name: "Catalog To Update" });
    const { id } = createRes.body as Catalog;

    // Missing name field
    const updateRes = await request(app.getHttpServer())
      .put(`/catalogs/${id}`)
      .send({});

    expect(updateRes.status).toBe(400);
  });

  it("/catalogs/:id (DELETE) should remove a catalog", async () => {
    // First, create a catalog to delete
    const createRes = await request(app.getHttpServer())
      .post("/catalogs")
      .send({ name: "Catalog To Delete" });
    const { id } = createRes.body as Catalog;

    const deleteRes = await request(app.getHttpServer()).delete(
      `/catalogs/${id}`,
    );

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty("id", id);

    // Confirm it's deleted
    const getRes = await request(app.getHttpServer()).get(`/catalogs/${id}`);

    expect(getRes.status).toBe(404);
  });
});
