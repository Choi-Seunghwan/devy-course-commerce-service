import { OrderStatus } from '@prisma/client';
import { OrderItemResponseDto } from './order-item-response.dto';
import { PaymentResponseDto } from 'src/payment/dtos/payment-response.dto';

export class OrderResponseDto {
  id: number;
  customerId: number;
  status: OrderStatus;
  orderNo: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
  updatedById?: number;
  orderItems: OrderItemResponseDto[];
  payments: PaymentResponseDto[];
}
