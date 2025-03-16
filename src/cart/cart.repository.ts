import { Injectable } from '@nestjs/common';
import { getProductOmitFields } from 'src/common/omit/product.omit';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getOmit() {
    return {
      createdById: true,
      updateById: true,
      deleteById: true,
      deletedAt: true,
    };
  }

  async findByCustomerId(customerId: number) {
    return await this.prisma.cart.findMany({
      where: { customerId, deletedAt: null },
      include: { product: { omit: getProductOmitFields() } },
      omit: this.getOmit(),
    });
  }

  async findByCustomerAndProduct(customerId: number, productId: number) {
    return await this.prisma.cart.findFirst({
      where: { customerId, productId, deletedAt: null },
      include: { product: { omit: getProductOmitFields() } },
      omit: this.getOmit(),
    });
  }

  async findByCustomerAndId(customerId: number, cartId: number) {
    return await this.prisma.cart.findFirst({
      where: { customerId, id: cartId, deletedAt: null },
      include: { product: { omit: getProductOmitFields() } },
      omit: this.getOmit(),
    });
  }

  async addToCart(customerId: number, productId: number, quantity: number) {
    return await this.prisma.cart.create({
      data: { customerId, productId, quantity, createdById: customerId },
      omit: this.getOmit(),
    });
  }

  async updateCartQuantity(cartId: number, quantity: number) {
    return await this.prisma.cart.update({
      where: { id: cartId, deletedAt: null },
      data: { quantity, updatedAt: new Date() },
      omit: this.getOmit(),
    });
  }

  async removeFromCart(cartId: number) {
    return await this.prisma.cart.update({
      where: { id: cartId, deletedAt: null },
      data: { deletedAt: new Date() },
      omit: this.getOmit(),
    });
  }
}
