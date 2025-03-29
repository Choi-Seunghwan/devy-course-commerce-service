import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getOrder(orderId: number) {
    return await this.orderRepository.getOrderById(orderId);
  }

  /**
   * 주문 내역 조회
   */
  async getOrders(customerId: number) {
    return await this.orderRepository.getOrdersByCustomerId(customerId);
  }

  /**
   * 주문하기
   */
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

  /**
   * 결제 시, 주문 데이터 확인
   */
  async validateAndGetOrderForPayment(orderId: number) {
    const order = await this.getOrder(orderId);

    if (!order) throw new NotFoundException('Order not found');

    if (order.status !== OrderStatus.PENDING)
      throw new BadRequestException('Order is not in pending status');

    return order;
  }

  /**
   * 주문 준비 상태로 변경
   */
  async updateOrderAsReady(orderId: number, updatedById: number) {
    await this.orderRepository.updateOrder({
      where: { id: orderId },
      data: { status: OrderStatus.READY, updatedAt: new Date(), updatedById },
    });
  }
}
