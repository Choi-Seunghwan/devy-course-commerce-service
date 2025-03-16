import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { Cart } from '@prisma/client';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductService,
  ) {}

  async getCart(customerId: number): Promise<Cart[]> {
    return await this.cartRepository.findByCustomerId(customerId);
  }

  async addToCart(customerId: number, productId: number, quantity: number) {
    const product = await this.productService.getProduct(productId);

    if (!product) throw new NotFoundException('Product not found');

    const existingCartItem = await this.cartRepository.findByCustomerAndProduct(
      customerId,
      productId,
    );

    if (existingCartItem) {
      return await this.cartRepository.updateCartQuantity(
        existingCartItem.id,
        existingCartItem.quantity + quantity,
      );
    }

    return await this.cartRepository.addToCart(customerId, productId, quantity);
  }

  async updateCartQuantity(
    customerId: number,
    cartId: number,
    quantity: number,
  ) {
    const cartItem = await this.cartRepository.findByCustomerAndId(
      customerId,
      cartId,
    );

    if (!cartItem) throw new NotFoundException('Cart item not found');

    return await this.cartRepository.updateCartQuantity(cartId, quantity);
  }

  async removeFromCart(customerId: number, cartId: number) {
    const cartItem = await this.cartRepository.findByCustomerAndId(
      customerId,
      cartId,
    );

    if (!cartItem) throw new NotFoundException('Cart item not found');

    return await this.cartRepository.removeFromCart(cartId);
  }
}
