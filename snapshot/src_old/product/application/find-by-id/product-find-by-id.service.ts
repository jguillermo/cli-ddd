import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponse } from '../product.response';
import { ProductId } from '../../domain/product-id';

@Injectable()
export class ProductFindByIdService {
  constructor(private repository: ProductRepository) {}

  public async execute(id: ProductId): Promise<ProductResponse | null> {
    const product = await this.repository.findById(id);
    if (!product) {
      return null;
    }
    return ProductResponse.fromAggregate(product);
  }
}
