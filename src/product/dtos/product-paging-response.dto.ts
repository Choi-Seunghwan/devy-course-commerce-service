import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class ProductPagingResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items: ProductResponseDto[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
