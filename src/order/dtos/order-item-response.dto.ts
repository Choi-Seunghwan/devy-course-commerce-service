import { ProductResponseDto } from 'src/product/dtos/product-response.dto';

export class OrderItemResponseDto {
  id: number;
  productId: number;
  orderId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
  updatedById: number;
  product?: ProductResponseDto;
}
