import { EnumType } from 'base-ddd';

export enum EnumProductCategory {
  books = 'books',
  computers = 'computers',
}

export class ProductCategory extends EnumType<string> {
  protected _enum = EnumProductCategory;
  get enum() {
    return this._enum;
  }

  isValid(): boolean {
    if (this.isNull) {
      throw new Error('is required.');
    }
    return true;
  }

  public validValue(value: string): boolean {
    return Object.keys(EnumProductCategory)
      .map((e) => EnumProductCategory[e])
      .includes(value);
  }
}
