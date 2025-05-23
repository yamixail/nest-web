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

export class UpdateProductDto {
  @ApiProperty({
    example: "Bluetooth Speaker Pro",
    description: "Product name",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: "Upgraded portable speaker with Bluetooth 5.2",
    description: "Product description",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: 59.99, description: "Product price" })
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
