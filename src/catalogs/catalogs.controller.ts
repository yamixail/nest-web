import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { CreateCatalogDto } from "./dto/create-catalog.dto";
import { UpdateCatalogDto } from "./dto/update-catalog.dto";

@Controller("catalogs")
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Get()
  findAll() {
    return this.catalogsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.catalogsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCatalogDto) {
    return this.catalogsService.create(body);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateCatalogDto,
  ) {
    return this.catalogsService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.catalogsService.remove(id);
  }
}
