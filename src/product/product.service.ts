import { Injectable } from '@nestjs/common';
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

  async getProduct(id: number) {
    return await this.productRepository.findById(id);
  }
}
