import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateCatalogDto {
  @ApiProperty({ example: "Speakers", description: "Catalog name" })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
