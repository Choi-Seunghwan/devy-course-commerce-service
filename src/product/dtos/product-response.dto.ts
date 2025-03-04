import { CategoryResponseDto } from 'src/category/dtos/category-response.dto';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;

  category?: CategoryResponseDto;

  createdAt: Date;
  updatedAt: Date;
}
