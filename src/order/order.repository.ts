import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(args: Prisma.OrderCreateArgs) {
    return await this.prisma.order.create(args);
  }

  async createOrderItems(args: Prisma.OrderItemCreateArgs) {
    return await this.prisma.orderItem.create(args);
  }

  async getOrderById(id: number) {
    return await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async updateOrder(args: Prisma.OrderUpdateArgs) {
    return await this.prisma.order.update(args);
  }
}
