import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Bluetooth Speaker" })
  name: string;

  @ApiProperty({ example: "Portable speaker with Bluetooth 5.0" })
  description: string;

  @ApiProperty({ example: 49.99 })
  price: number;

  @ApiProperty({ example: 5 })
  catalogId: number;
}
