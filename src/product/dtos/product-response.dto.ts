import { CategoryResponseDto } from 'src/category/dtos/category-response.dto';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;

  category?: CategoryResponseDto;

  createdAt: Date;
  updatedAt: Date;
}
