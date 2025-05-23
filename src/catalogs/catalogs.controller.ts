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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
} from "@nestjs/swagger";

import { CatalogsService } from "./catalogs.service";
import { CreateCatalogDto } from "./dto/create-catalog.dto";
import { UpdateCatalogDto } from "./dto/update-catalog.dto";
import { CatalogDto } from "./dto/catalog.dto";
import { ErrorResponseDto } from "../common/dto/error-response.dto";

@ApiTags("Catalogs")
@ApiExtraModels(ErrorResponseDto)
@Controller("catalogs")
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Get()
  @ApiOperation({ summary: "Get all catalogs" })
  @ApiResponse({
    status: 200,
    description: "List of all catalogs.",
    type: [CatalogDto],
  })
  findAll() {
    return this.catalogsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get catalog by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Catalog ID",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Catalog found.", type: CatalogDto })
  @ApiResponse({
    status: 404,
    description: "Catalog not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.catalogsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a new catalog" })
  @ApiBody({ type: CreateCatalogDto })
  @ApiResponse({
    status: 201,
    description: "Catalog created.",
    type: CatalogDto,
  })
  @ApiResponse({
    status: 409,
    description: "Catalog with this name already exists.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  create(@Body() body: CreateCatalogDto) {
    return this.catalogsService.create(body);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a catalog" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Catalog ID",
    example: 1,
  })
  @ApiBody({ type: UpdateCatalogDto })
  @ApiResponse({
    status: 200,
    description: "Catalog updated.",
    type: CatalogDto,
  })
  @ApiResponse({
    status: 404,
    description: "Catalog not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  @ApiResponse({
    status: 409,
    description: "Catalog with this name already exists.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateCatalogDto,
  ) {
    return this.catalogsService.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a catalog" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Catalog ID",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Catalog deleted.",
    type: CatalogDto,
  })
  @ApiResponse({
    status: 404,
    description: "Catalog not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  @ApiResponse({
    status: 400,
    description: "Cannot delete catalog with assigned products.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.catalogsService.remove(id);
  }
}
