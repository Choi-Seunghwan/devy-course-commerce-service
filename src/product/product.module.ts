import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, productRepository],
  exports: [ProductService],
})
export class ProductModule {}
