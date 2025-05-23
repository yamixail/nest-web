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

import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductDto } from "./dto/product.dto";
import { ErrorResponseDto } from "../common/dto/error-response.dto";

@ApiTags("Products")
@ApiExtraModels(ErrorResponseDto)
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "List of all products.",
    type: [ProductDto],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Product ID",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Product found.", type: ProductDto })
  @ApiResponse({
    status: 404,
    description: "Product not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get("/catalog/:catalogId")
  @ApiOperation({ summary: "Get products by catalog ID" })
  @ApiParam({
    name: "catalogId",
    type: Number,
    description: "Catalog ID",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "List of products for the catalog.",
    type: [ProductDto],
  })
  findByCatalog(@Param("catalogId", ParseIntPipe) catalogId: number) {
    return this.productsService.findByCatalog(catalogId);
  }

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: "Product created.",
    type: ProductDto,
  })
  @ApiResponse({
    status: 404,
    description: "Catalog not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  @ApiResponse({
    status: 409,
    description: "Product with this name already exists in this catalog.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a product" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Product ID",
    example: 1,
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: "Product updated.",
    type: ProductDto,
  })
  @ApiResponse({
    status: 404,
    description: "Product or catalog not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  @ApiResponse({
    status: 409,
    description: "Product with this name already exists in this catalog.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Product ID",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Product deleted.",
    type: ProductDto,
  })
  @ApiResponse({
    status: 404,
    description: "Product not found.",
    schema: { $ref: getSchemaPath(ErrorResponseDto) },
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
