import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class UpdateCatalogDto {
  @ApiProperty({ example: "Webcams", description: "Catalog name" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
