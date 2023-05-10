import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductResolver } from './product.resolver';
@Module({
  providers: [ProductService, ProductResolver],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
