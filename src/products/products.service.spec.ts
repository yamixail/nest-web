import { ProductsService } from "./products.service";
import { products, catalogs } from "../mock-data";
import { NotFoundException, ConflictException } from "@nestjs/common";

describe("ProductsService", () => {
  let service: ProductsService;

  beforeEach(() => {
    // Reset products and catalogs to a known state before each test
    products.length = 0;
    catalogs.length = 0;

    catalogs.push({ id: 1, name: "Keyboards" }, { id: 2, name: "Mice" });
    products.push({
      id: 1,
      name: "Test Product",
      description: "desc",
      price: 10,
      catalogId: 1,
    });

    service = new ProductsService();
  });

  it("should return all products", () => {
    expect(service.findAll()).toEqual(products);
  });

  it("should return a product by id", () => {
    expect(service.findOne(1)).toEqual(products[0]);
  });

  it("should throw NotFoundException if product not found", () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it("should return products by catalog", () => {
    expect(service.findByCatalog(1)).toEqual([products[0]]);
    expect(service.findByCatalog(2)).toEqual([]);
  });

  it("should create a new product", () => {
    const newProduct = service.create({
      name: "New Product",
      description: "desc",
      price: 20,
      catalogId: 1,
    });

    expect(newProduct).toHaveProperty("id");
    expect(newProduct).toHaveProperty("name", "New Product");
    expect(products).toContainEqual(newProduct);
  });

  it("should throw NotFoundException when creating product with invalid catalog", () => {
    expect(() =>
      service.create({
        name: "Invalid",
        description: "desc",
        price: 10,
        catalogId: 999,
      }),
    ).toThrow(NotFoundException);
  });

  it("should throw ConflictException when creating duplicate product name in same catalog", () => {
    expect(() =>
      service.create({
        name: "Test Product",
        description: "desc",
        price: 10,
        catalogId: 1,
      }),
    ).toThrow(ConflictException);
  });

  it("should update a product", () => {
    const updated = service.update(1, {
      name: "Updated",
      description: "desc2",
      price: 30,
      catalogId: 1,
    });

    expect(updated).toEqual({
      id: 1,
      name: "Updated",
      description: "desc2",
      price: 30,
      catalogId: 1,
    });
    expect(products[0].name).toBe("Updated");
  });

  it("should throw NotFoundException when updating non-existent product", () => {
    expect(() =>
      service.update(999, {
        name: "Nope",
        description: "desc",
        price: 10,
        catalogId: 1,
      }),
    ).toThrow(NotFoundException);
  });

  it("should throw NotFoundException when updating with invalid catalog", () => {
    expect(() =>
      service.update(1, {
        name: "Nope",
        description: "desc",
        price: 10,
        catalogId: 999,
      }),
    ).toThrow(NotFoundException);
  });

  it("should throw ConflictException when updating to duplicate name in same catalog", () => {
    // Add another product in the same catalog
    products.push({
      id: 2,
      name: "Another Product",
      description: "desc",
      price: 15,
      catalogId: 1,
    });

    expect(() =>
      service.update(2, {
        name: "Test Product",
        description: "desc",
        price: 15,
        catalogId: 1,
      }),
    ).toThrow(ConflictException);
  });

  it("should remove a product", () => {
    const removed = service.remove(1);

    expect(removed).toEqual({
      id: 1,
      name: "Test Product",
      description: "desc",
      price: 10,
      catalogId: 1,
    });
    expect(products.find((p) => p.id === 1)).toBeUndefined();
  });

  it("should throw NotFoundException when removing non-existent product", () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });
});
