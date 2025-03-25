export type PortOnePaymentStatus =
  | 'PAID'
  | 'FAILED'
  | 'CANCELLED'
  | 'READY'
  | 'PAY_PENDING'
  | 'PARTIAL_CANCELLED'
  | 'VIRTUAL_ACCOUNT_ISSUED';

export type PortOneEasyPayProvider =
  | 'SAMSUNGPAY'
  | 'KAKAOPAY'
  | 'NAVERPAY'
  | 'PAYCO'
  | 'SSGPAY'
  | 'CHAI'
  | 'LPAY'
  | 'KPAY'
  | 'TOSSPAY'
  | 'LGPAY'
  | 'PINPAY'
  | 'APPLEPAY'
  | 'SKPAY'
  | 'TOSS_BRANDPAY'
  | 'KB_APP'
  | 'ALIPAY'
  | 'HYPHEN'
  | 'TMONEY'
  | 'PAYPAL'
  | 'SMILEPAY'
  | 'MIR'
  | 'WECHAT'
  | 'LINEPAY'
  | 'KLARNA'
  | 'GRABPAY'
  | 'SHOPEEPAY'
  | 'JKOPAY'
  | 'PAYPAY';

export type PortOnePaymentCurrency = 'KRW' | 'USE' | string;

export type PortOnePaymentInstallment = {
  month: number;
  isInterestFree: boolean;
};

export type PortOnePaymentEasyPayMethod = {
  type: 'PaymentMethodEasyPay';
  provider?: PortOneEasyPayProvider;
  easyPayMethod?: object;
};

export type PortOnePaymentCardMethod = {
  type: 'PaymentMethodCard';
  card?: object;
  approvalNumber?: string;
  installment?: PortOnePaymentInstallment;
  pointUsed?: boolean;
};

export type PortOnePaymentAmount = {
  total: number;
  taxFree: number;
  vat?: number;
  supply?: number;
  discount: number;
  paid: number;
  cancelled: number;
  cancelledTaxFree: number;
};

export type PortOnePayment = {
  id: string;
  status: PortOnePaymentStatus;
  transactionId: string;
  merchantId: string;
  storeId: string;
  method?: PortOnePaymentCardMethod | PortOnePaymentEasyPayMethod;
  channel: object;
  channelGroup?: object;
  version: string;
  webhooks?: Array<object>;
  amount: PortOnePaymentAmount;
  currency: PortOnePaymentCurrency;
  customer: object;
  paidAt: string;

  /** response status cancelled */
  cancelledAt?: string;
  cancellations: object;
  /** --- */

  /** ... other fields */
};
