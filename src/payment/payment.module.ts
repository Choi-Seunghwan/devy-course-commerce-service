import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';
import { OrderModule } from 'src/order/order.module';
import { PortOneService } from './portone.service';

@Module({
  imports: [OrderModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, PortOneService],
  exports: [PaymentService],
})
export class PaymentModule {}
