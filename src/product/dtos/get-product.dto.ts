import { IsNumber } from 'class-validator';

export class GetProductDto {
  @IsNumber()
  id: number;
}
