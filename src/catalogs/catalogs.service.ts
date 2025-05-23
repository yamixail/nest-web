import { Injectable, NotFoundException } from "@nestjs/common";
import { catalogs, getNextCatalogId } from "../mock-data";
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
    const newCatalog = { id: getNextCatalogId(), name: body.name };

    catalogs.push(newCatalog);

    return newCatalog;
  }

  update(id: number, body: UpdateCatalogDto) {
    const index = catalogs.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Catalog with id ${id} not found`);
    }

    // Replace the whole object except id (which comes from URL)
    catalogs[index] = { ...body, id };

    return catalogs[index];
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
