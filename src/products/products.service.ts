import { Injectable, NotFoundException } from "@nestjs/common";
import { products, catalogs, getNextProductId } from "../mock-data";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  findAll() {
    return products;
  }

  findOne(id: number) {
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  findByCatalog(catalogId: number) {
    return products.filter((p) => p.catalogId === catalogId);
  }

  create(body: CreateProductDto) {
    const catalog = catalogs.find((c) => c.id === body.catalogId);

    if (!catalog) {
      throw new NotFoundException(
        `Catalog with id ${body.catalogId} not found`,
      );
    }

    const newProduct = { ...body, id: getNextProductId() };

    products.push(newProduct);

    return newProduct;
  }

  update(id: number, body: UpdateProductDto) {
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const catalog = catalogs.find((c) => c.id === body.catalogId);

    if (!catalog) {
      throw new NotFoundException(
        `Catalog with id ${body.catalogId} not found`,
      );
    }

    // Replace the whole object except id (which comes from URL)
    products[index] = { ...body, id };

    return products[index];
  }

  remove(id: number) {
    const idx = products.findIndex((p) => p.id === id);

    if (idx === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const [removed] = products.splice(idx, 1);

    return removed;
  }
}
