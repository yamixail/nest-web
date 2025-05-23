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
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: "price must be a number" })
  @Min(0)
  price: number;

  @Type(() => Number)
  @IsInt({ message: "catalogId must be an integer" })
  @Min(1)
  catalogId: number;
}
