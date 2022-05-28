import { ProductResponse } from './product.response';

export class ProductListResponse {
  public list: ProductResponse[];

  constructor(list: ProductResponse[]) {
    this.list = list;
  }
}
