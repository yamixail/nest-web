import { Module } from "@nestjs/common";
import { CatalogsModule } from "./catalogs/catalogs.module";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [CatalogsModule, ProductsModule],
})
export class AppModule {}
