import crypto from 'crypto';

export const generateToteId = () => {
  return Math.floor(Math.random() * 9999999999)
    .toString()
    .trim()
    .padStart(10, '0');
};

export const generateSkuId = (): string => {
  return crypto.createHash('md5').update(crypto.randomBytes(256)).digest('hex');
};

export { v4 as generateId } from '@lukeed/uuid/secure';
