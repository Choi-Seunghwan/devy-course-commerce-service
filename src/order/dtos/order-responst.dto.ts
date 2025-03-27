export class OrderResponseDto {
  status: string;
  id: number;
  customerId: number;
  orderNo: string;
  totalPrice: number;
  createdAt: Date;
  createdById: number;
}
