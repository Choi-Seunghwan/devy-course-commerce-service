import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dtos/product-response.dto';
import { GetProductDto } from './dtos/get-product.dto';
import { GetProductsDto } from './dtos/get-products.dto';
import { ProductPagingResponseDto } from './dtos/product-paging-response.dto';
import { PagingResponse } from '@choi-seunghwan/api-util';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({ type: ProductPagingResponseDto })
  @Get('/')
  async getProducts(
    @Query() query: GetProductsDto,
  ): Promise<ProductPagingResponseDto> {
    const result = await this.productService.getProducts(query);
    return PagingResponse.of(
      result.items,
      result.total,
      query.page,
      query.size,
    );
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get('/:id')
  async getProduct(@Param() param: GetProductDto) {
    const result = await this.productService.getProduct(param.id);
    return result;
  }
}
