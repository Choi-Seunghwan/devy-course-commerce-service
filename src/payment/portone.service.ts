import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PortOnePayment } from './types/portone.type';

@Injectable()
export class PortOneService {
  constructor(private readonly configService: ConfigService) {}

  async getPortOnePayment(paymentKey: string): Promise<PortOnePayment> {
    const response = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentKey)}?storeId=${this.configService.getOrThrow('PORTONE_STORE_ID')}`,
      {
        headers: {
          Authorization: `PortOne ${this.configService.getOrThrow('PORTONE_API_KEY')}`,
        },
      },
    );

    if (!response.ok) {
      throw new InternalServerErrorException(
        `Failed to get Portone payment: ${response.status} - ${response.statusText}`,
      );
    }
    return response.json().then((res) => res.data);
  }

  async validatePaidPortOnePayment(paymentKey: string) {
    const portOnePayment = await this.getPortOnePayment(paymentKey);

    if (portOnePayment.status !== 'PAID') {
      throw new InternalServerErrorException('Payment is not paid');
    }

    return portOnePayment;
  }
}
