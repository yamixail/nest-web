import { CatalogsService } from "./catalogs.service";
import { catalogs, products } from "../mock-data";
import {
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";

describe("CatalogsService", () => {
  let service: CatalogsService;

  beforeEach(() => {
    // Reset catalogs and products to a known state before each test
    catalogs.length = 0;
    products.length = 0;
    catalogs.push({ id: 1, name: "Keyboards" }, { id: 2, name: "Mice" });
    service = new CatalogsService();
  });

  it("should return all catalogs", () => {
    expect(service.findAll()).toEqual(catalogs);
  });

  it("should return a catalog by id", () => {
    expect(service.findOne(1)).toEqual({ id: 1, name: "Keyboards" });
  });

  it("should throw NotFoundException if catalog not found", () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it("should create a new catalog", () => {
    const newCatalog = service.create({ name: "Monitors" });

    expect(newCatalog).toHaveProperty("id");
    expect(newCatalog).toHaveProperty("name", "Monitors");
    expect(catalogs).toContainEqual(newCatalog);
  });

  it("should throw ConflictException if creating duplicate catalog name", () => {
    expect(() => service.create({ name: "Keyboards" })).toThrow(
      ConflictException,
    );
  });

  it("should update a catalog", () => {
    const updated = service.update(1, { name: "Updated Keyboards" });

    expect(updated).toEqual({ id: 1, name: "Updated Keyboards" });
    expect(catalogs.find((c) => c.id === 1)?.name).toBe("Updated Keyboards");
  });

  it("should throw NotFoundException when updating non-existent catalog", () => {
    expect(() => service.update(999, { name: "Nope" })).toThrow(
      NotFoundException,
    );
  });

  it("should throw ConflictException when updating to duplicate name", () => {
    expect(() => service.update(1, { name: "Mice" })).toThrow(
      ConflictException,
    );
  });

  it("should remove a catalog", () => {
    const removed = service.remove(1);

    expect(removed).toEqual({ id: 1, name: "Keyboards" });
    expect(catalogs.find((c) => c.id === 1)).toBeUndefined();
  });

  it("should throw NotFoundException when removing non-existent catalog", () => {
    expect(() => service.remove(999)).toThrow(NotFoundException);
  });

  it("should throw BadRequestException when removing catalog with assigned products", () => {
    products.push({
      id: 1,
      name: "Test Product",
      description: "desc",
      price: 10,
      catalogId: 1,
    });

    expect(() => service.remove(1)).toThrow(BadRequestException);
  });
});
