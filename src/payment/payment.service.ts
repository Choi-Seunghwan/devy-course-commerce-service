import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { Order, PaymentStatus } from '@prisma/client';
import { generatePaymentKey } from './utils/payment.util';
import { PortOneService } from './portone.service';
import { Transactional } from '@nestjs-cls/transactional';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly portOneService: PortOneService,
    private readonly orderService: OrderService,
  ) {}

  /**
   * 결제 요청
   */
  async requestPayment(customerId: number, order: Order) {
    const alreadyPayment = await this.paymentRepository.findPayment({
      where: {
        customerId,
        orderId: order.id,
      },
    });

    if (order.status !== PaymentStatus.PENDING)
      throw new InternalServerErrorException(
        'Payment is not in pending status',
      );

    if (alreadyPayment) return alreadyPayment;

    await this.paymentRepository.createPayment({
      data: {
        paymentKey: generatePaymentKey(),
        customerId,
        orderId: order.id,
        amount: order.totalPrice,
        status: PaymentStatus.PENDING,
      },
    });
  }

  @Transactional()
  async completePayment(customerId: number, paymentKey: string) {
    await this.portOneService.validatePaidPortOnePayment(paymentKey);

    const payment = await this.paymentRepository.findPayment({
      where: { paymentKey },
    });

    if (payment.customerId !== customerId)
      throw new ForbiddenException('not allowed');

    if (payment.status !== PaymentStatus.PENDING)
      throw new InternalServerErrorException(
        'Payment is not in pending status',
      );

    await this.paymentRepository.updatePayment({
      where: { id: payment.id },
      data: { status: PaymentStatus.PAID, paidAt: new Date() },
    });

    await this.orderService.updateOrderAsReady(payment.orderId, customerId);
  }
}
