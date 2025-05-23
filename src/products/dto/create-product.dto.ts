import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  MinLength,
  MaxLength,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @ApiProperty({
    example: "Bluetooth Speaker",
    description: "Product name",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: "Portable speaker with Bluetooth 5.0",
    description: "Product description",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: 49.99, description: "Product price" })
  @Type(() => Number)
  @IsNumber({}, { message: "price must be a number" })
  @Min(0)
  price: number;

  @ApiProperty({ example: 5, description: "Catalog ID" })
  @Type(() => Number)
  @IsInt({ message: "catalogId must be an integer" })
  @Min(1)
  catalogId: number;
}
