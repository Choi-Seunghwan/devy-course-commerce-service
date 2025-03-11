import { Injectable, NotFoundException } from '@nestjs/common';
import { productRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: productRepository) {}

  async getProducts(query: { page?: number; size?: number }) {
    const result = await this.productRepository.findManyWithPaging(
      {
        orderBy: { createdAt: 'desc' },
      },
      { page: query.page, size: query.size },
    );

    return {
      items: result.items,
      total: result.total,
    };
  }

  async getProduct(productId: number) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }
}
