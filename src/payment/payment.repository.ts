import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPayment(args: Prisma.PaymentCreateArgs) {
    return await this.prisma.payment.create(args);
  }

  async findPayment(args: Prisma.PaymentFindFirstArgs) {
    return await this.prisma.payment.findFirst(args);
  }

  async updatePayment(args: Prisma.PaymentUpdateArgs) {
    return await this.prisma.payment.update(args);
  }
}
