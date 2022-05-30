import { BooleanType } from 'base-ddd';

export class ProductIsActive extends BooleanType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
