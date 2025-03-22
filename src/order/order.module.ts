import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [ProductModule, CartModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
