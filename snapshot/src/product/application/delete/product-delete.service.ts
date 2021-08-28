import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/product.repository';
import { ProductId } from '../../domain/product-id';

@Injectable()
export class ProductDeleteService {
  constructor(private repository: ProductRepository, private eventBus: EventBus) {}

  public async execute(id: ProductId): Promise<void> {
    const product = await this.repository.findById(id);
    if (product) {
      product.delete();
      await this.repository.deleteById(product.id);
      this.eventBus.publishAll(product.pullDomainEvents());
    }
  }
}
