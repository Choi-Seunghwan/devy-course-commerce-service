import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderProduct } from './dtos/order.dto';
import { OrderStatus } from '@prisma/client';
import { ProductService } from 'src/product/product.service';
import generateOrderNo from './utils/generate-order-no';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  async order(
    customerId: number,
    orderData: { orderProducts: OrderProduct[]; totalPrice: number },
  ) {
    const products = await this.productService.getProductsByIds(
      orderData.orderProducts.map((item) => item.productId),
    );

    if (products.length !== orderData.orderProducts.length)
      throw new NotFoundException('Product not found');

    return await this.orderRepository.createOrder({
      data: {
        customerId,
        createdById: customerId,
        totalPrice: orderData.totalPrice,
        status: OrderStatus.PENDING,
        orderNo: generateOrderNo(),
        orderItems: {
          create: orderData.orderProducts.map((item) => ({
            productId: item.productId,
            productName: products.find((p) => p.id === item.productId).name,
            productPrice: products.find((p) => p.id === item.productId).price,
            quantity: item.quantity,
            createdById: customerId,
          })),
        },
      },
    });
  }
}
