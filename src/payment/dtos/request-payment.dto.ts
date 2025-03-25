import { IsNumber } from 'class-validator';

export class RequestPaymentDto {
  @IsNumber()
  orderId: number;
}
