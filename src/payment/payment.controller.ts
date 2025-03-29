import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard, JwtPayload, User } from '@choi-seunghwan/authorization';
import { RequestPaymentDto } from './dtos/request-payment.dto';
import { OrderService } from 'src/order/order.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { RequestPaymentResponseDto } from './dtos/request-payment-response.dto';
import { CompletePaymentDto } from './dtos/complete-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
  ) {}

  @ApiOkResponse({ type: RequestPaymentResponseDto })
  @UseGuards(AuthGuard)
  @Post('/request')
  async requestPayment(
    @User() user: JwtPayload,
    @Body() dto: RequestPaymentDto,
  ) {
    const order = await this.orderService.validateAndGetOrderForPayment(
      dto.orderId,
    );

    const paymentKey = await this.paymentService.requestPayment(
      user.accountId,
      order,
    );

    return { paymentKey };
  }

  @ApiOkResponse({ type: Boolean })
  @UseGuards(AuthGuard)
  @Post('/complete')
  async completePayment(
    @User() user: JwtPayload,
    @Body() dto: CompletePaymentDto,
  ) {
    return await this.paymentService.completePayment(
      user.accountId,
      dto.paymentKey,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/callback')
  async callback() {
    return true;
  }
}
