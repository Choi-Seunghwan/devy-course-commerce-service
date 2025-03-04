import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dtos/product-response.dto';
import { GetProductDto } from './dtos/get-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  @Get('/')
  async getProducts() {
    const result = await this.productService.getProducts();
    return result;
  }

  @ApiOkResponse({ type: ProductResponseDto, isArray: true })
  @Get('/:id')
  async getProduct(@Param() param: GetProductDto) {
    const result = await this.productService.getProduct(param.id);
    return result;
  }
}
