import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtPayload, User } from '@choi-seunghwan/authorization';
import { OrderDto } from './dtos/order.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) {}

  @Post('/')
  async order(@User() user: JwtPayload, @Body() dto: OrderDto) {
    const createdOrder = await this.orderService.order(user.accountId, dto);

    try {
      await this.cartService.clearCartAfterOrder(
        user.accountId,
        dto.orderProducts.map((item) => item.productId),
      );
    } catch (err) {
      // 실패해도 주문은 정상 처리
      console.warn(`Failed to clear cart after order:`, err.message);
    }

    return createdOrder;
  }
}
