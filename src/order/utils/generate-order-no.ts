import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

// EX ORD20250319083015-AB12CD

export default function generateOrderNo() {
  const date = new Date();
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const timePart = date.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
  const randomPart = nanoid();
  return `ORD${datePart}${timePart}-${randomPart}`;
}
