import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { catalogs, products, getNextCatalogId } from "../mock-data";
import { CreateCatalogDto } from "./dto/create-catalog.dto";
import { UpdateCatalogDto } from "./dto/update-catalog.dto";

@Injectable()
export class CatalogsService {
  findAll() {
    return catalogs;
  }

  findOne(id: number) {
    const catalog = catalogs.find((c) => c.id === id);

    if (!catalog) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    return catalog;
  }

  create(body: CreateCatalogDto) {
    if (
      catalogs.some((c) => c.name.toLowerCase() === body.name.toLowerCase())
    ) {
      throw new ConflictException(
        `Catalog with name "${body.name}" already exists`,
      );
    }

    const newCatalog = { id: getNextCatalogId(), name: body.name };

    catalogs.push(newCatalog);

    return newCatalog;
  }

  update(id: number, body: UpdateCatalogDto) {
    const index = catalogs.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    if (
      catalogs.some(
        (c) => c.name.toLowerCase() === body.name.toLowerCase() && c.id !== id,
      )
    ) {
      throw new ConflictException(
        `Catalog with name "${body.name}" already exists`,
      );
    }

    catalogs[index] = { ...body, id };

    return catalogs[index];
  }

  remove(id: number) {
    const index = catalogs.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    // Prevent deleting a catalog if products are assigned to it
    if (products.some((p) => p.catalogId === id)) {
      throw new BadRequestException(
        "Cannot delete catalog with assigned products",
      );
    }

    const [removed] = catalogs.splice(index, 1);

    return removed;
  }
}
