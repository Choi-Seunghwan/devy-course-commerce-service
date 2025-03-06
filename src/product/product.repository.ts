import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class productRepository {
  constructor(private readonly prisma: PrismaService) {}

  private getOmit() {
    return {
      createdById: true,
      updateById: true,
      deleteById: true,
      deletedAt: true,
    };
  }

  async findAll(args: Prisma.ProductFindManyArgs) {
    return await this.prisma.product.findMany({
      ...args,
      where: { ...args.where, deletedAt: null },
      omit: this.getOmit(),
    });
  }

  async findById(id: number) {
    return await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      omit: this.getOmit(),
    });
  }
}
