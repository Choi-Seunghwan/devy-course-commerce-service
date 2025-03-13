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
import { UpdateCartDto } from './dtos/update-cart.dto';

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
    return await this.cartService.addToCart(
      user.accountId,
      dto.productId,
      dto.quantity,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/')
  async updateCart(@User() user: JwtPayload, @Body() dto: UpdateCartDto) {
    return await this.cartService.updateCart(
      user.accountId,
      dto.productId,
      dto.quantity,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:cartId')
  async removeFromCart(
    @User() user: JwtPayload,
    @Param('cartId') cartId: number,
  ) {
    return await this.cartService.removeFromCart(Number(cartId));
  }
}
