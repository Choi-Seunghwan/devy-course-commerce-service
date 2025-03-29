import { PaymentStatus } from '@prisma/client';

export class PaymentResponseDto {
  id: number;
  customerId: number;
  orderId: number;
  status: PaymentStatus;
  amount: number;
  paymentKey?: string;
  method?: string;
  provider?: string;
  requestedAt: Date;
  paidAt?: Date;
}
