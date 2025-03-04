import { Injectable } from '@nestjs/common';
import { productRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: productRepository) {}

  async getProducts() {
    return await this.productRepository.findAll({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProduct(id: number) {
    return await this.productRepository.findById(id);
  }
}
