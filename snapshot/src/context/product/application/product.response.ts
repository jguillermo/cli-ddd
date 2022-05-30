import { Product } from '../domain/aggregate/product';

export class ProductResponse {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public description: string,
    public createAt: Date,
    public price: number,
    public isActive: boolean,
    public category: string,
  ) {}

  static fromAggregate(product: Product) {
    return new ProductResponse(
      product.id.value,
      product.name.value,
      product.code.value,
      product.description.value,
      product.createAt.value,
      product.price.value,
      product.isActive.value,
      product.category.value,
    );
  }
}
