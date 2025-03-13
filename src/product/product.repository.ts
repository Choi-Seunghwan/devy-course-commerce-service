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

  private getOrderBy(): Prisma.ProductOrderByWithAggregationInput[] {
    return [{ id: 'desc' }, { createdAt: 'desc' }];
  }

  async findManyWithPaging(
    args: Prisma.ProductFindManyArgs,
    paging: { page: number; size: number },
  ) {
    const total = await this.prisma.product.count({
      where: { ...args.where, deletedAt: null },
    });

    const items = await this.prisma.product.findMany({
      ...args,
      skip: (paging.page - 1) * paging.size,
      take: paging.size,
      where: { ...args.where, deletedAt: null },
      orderBy: this.getOrderBy(),
      omit: this.getOmit(),
    });

    return { total, items };
  }

  async findById(id: number) {
    return await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      omit: this.getOmit(),
    });
  }
}
