import { ProductResponse } from './product.response';

export class ListProductResponse {
  public list: ProductResponse[];

  constructor(list: ProductResponse[]) {
    this.list = list;
  }
}
