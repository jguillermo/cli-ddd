import { NumberType } from 'base-ddd';

export class ProductPrice extends NumberType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
