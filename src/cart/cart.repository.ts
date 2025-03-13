import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCustomerId(customerId: number): Promise<Cart[]> {
    return await this.prisma.cart.findMany({
      where: { customerId, deletedAt: null },
      include: { product: true },
    });
  }

  async findByCustomerAndProduct(
    customerId: number,
    productId: number,
  ): Promise<Cart | null> {
    return await this.prisma.cart.findFirst({
      where: { customerId, productId, deletedAt: null },
    });
  }

  async addToCart(
    customerId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    return await this.prisma.cart.create({
      data: { customerId, productId, quantity, createdById: customerId },
    });
  }

  async updateCart(cartId: number, quantity: number): Promise<Cart> {
    return await this.prisma.cart.update({
      where: { id: cartId },
      data: { quantity, updatedAt: new Date() },
    });
  }

  async removeFromCart(cartId: number): Promise<Cart> {
    return await this.prisma.cart.update({
      where: { id: cartId },
      data: { deletedAt: new Date() },
    });
  }
}
