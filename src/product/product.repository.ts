import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class productRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: Prisma.ProductFindManyArgs) {
    return await this.prisma.product.findMany({
      ...args,
      where: { ...args.where, deletedAt: null },
    });
  }

  async findById(id: number) {
    return await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
    });
  }
}
