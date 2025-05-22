import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { catalogs, getNextCatalogId } from "../mock-data";

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

  create(body: { name: string }) {
    if (!body.name || typeof body.name !== "string") {
      throw new BadRequestException("Catalog name is required");
    }

    const newCatalog = { id: getNextCatalogId(), name: body.name };

    catalogs.push(newCatalog);

    return newCatalog;
  }

  update(id: number, body: { name: string }) {
    const catalog = catalogs.find((c) => c.id === id);

    if (!catalog) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    if (!body.name || typeof body.name !== "string") {
      throw new BadRequestException("Catalog name is required");
    }

    catalog.name = body.name;

    return catalog;
  }

  remove(id: number) {
    const index = catalogs.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    const [removed] = catalogs.splice(index, 1);

    return removed;
  }
}
