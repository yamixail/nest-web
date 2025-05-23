import { ApiProperty } from "@nestjs/swagger";

export class CatalogDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Keyboards" })
  name: string;
}
