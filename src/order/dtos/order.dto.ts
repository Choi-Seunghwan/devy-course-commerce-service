import { ArrayMinSize, IsArray, IsNumber } from 'class-validator';

export class OrderProduct {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class OrderDto {
  @IsArray()
  @ArrayMinSize(1)
  orderProducts: OrderProduct[];

  @IsNumber()
  totalPrice: number;
}
