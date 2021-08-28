import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/product.repository';
import { Product } from '../../domain/product';
import { ProductId } from '../../domain/product-id';
import { ProductName } from '../../domain/product-name';
import { ProductCode } from '../../domain/product-code';
import { ProductDescription } from '../../domain/product-description';
import { ProductCreateAt } from '../../domain/product-create-at';
import { ProductPrice } from '../../domain/product-price';
import { ProductCategory } from '../../domain/product-category';

@Injectable()
export class ProductPersistService {
  constructor(private repository: ProductRepository, private eventBus: EventBus) {}

  public async execute(
    id: ProductId,
    name: ProductName,
    code: ProductCode,
    description: ProductDescription,
    createAt: ProductCreateAt,
    price: ProductPrice,
    category: ProductCategory,
  ): Promise<void> {
    let product = await this.repository.findById(id);
    if (!product) {
      product = Product.create(id, name, code, description, createAt, price, category);
    } else {
      product.update(name, code, description, createAt, price, category);
    }
    await this.repository.persist(product);
    this.eventBus.publishAll(product.pullDomainEvents());
  }
}
