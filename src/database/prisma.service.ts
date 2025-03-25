import { Transactional } from '@nestjs-cls/transactional';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }

  @Transactional()
  async executeTransaction(callback: (prisma: PrismaClient) => Promise<any>) {
    return await callback(this);
  }
}
