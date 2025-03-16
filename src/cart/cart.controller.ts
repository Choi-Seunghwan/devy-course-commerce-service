import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard, JwtPayload, User } from '@choi-seunghwan/authorization';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartQuantityDto } from './dtos/update-cart-quantity.dto'; // ✅ 새로 추가 (cartId, quantity)

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getCart(@User() user: JwtPayload) {
    return await this.cartService.getCart(Number(user.accountId));
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async addToCart(@User() user: JwtPayload, @Body() dto: AddToCartDto) {
    await this.cartService.addToCart(
      user.accountId,
      dto.productId,
      dto.quantity,
    );
    return true;
  }

  @UseGuards(AuthGuard)
  @Patch('/:cartId')
  async updateCartQuantity(
    @User() user: JwtPayload,
    @Param('cartId') cartId: number,
    @Body() dto: UpdateCartQuantityDto,
  ) {
    await this.cartService.updateCartQuantity(
      user.accountId,
      Number(cartId),
      dto.quantity,
    );
    return true;
  }

  @UseGuards(AuthGuard)
  @Delete('/:cartId')
  async removeFromCart(
    @User() user: JwtPayload,
    @Param('cartId') cartId: number,
  ) {
    await this.cartService.removeFromCart(user.accountId, Number(cartId));
    return true;
  }
}
