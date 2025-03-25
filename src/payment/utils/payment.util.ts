import { nanoid } from 'nanoid';
import { PAYMENT_KEY_SIZE } from '../constants/payment.constant';

export const generatePaymentKey = () => {
  return nanoid(PAYMENT_KEY_SIZE);
};
