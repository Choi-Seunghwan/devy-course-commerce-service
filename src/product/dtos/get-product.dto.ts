import { IsNumber } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  productId: number;
}
