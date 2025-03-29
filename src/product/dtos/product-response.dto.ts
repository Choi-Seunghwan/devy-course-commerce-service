import { CategoryResponseDto } from 'src/category/dtos/category-response.dto';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  images: string[];
  description?: string;

  createdAt: Date;
  updatedAt?: Date;
  createdById: number;
  updatedById: number;

  category?: CategoryResponseDto;
}
