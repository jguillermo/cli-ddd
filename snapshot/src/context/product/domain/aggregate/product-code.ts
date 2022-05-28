import { UUIDType } from 'base-ddd';

export class ProductCode extends UUIDType {
  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }
}
