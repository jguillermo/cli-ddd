import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Product } from '../../domain/product';
import { ProductId } from '../../domain/product-id';
import { ProductDao } from './product.dao';
import { ProductRepository } from '../../domain/product.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class ProductFirestoreRepository extends ProductRepository {
  private _collection = 'products';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(product: Product): Promise<void> {
    const dao = ProductDao.fromAggregate(product);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: ProductId): Promise<Product | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return ProductDao.fromItem(item).toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Product[]> {
    if (!Array.isArray(filters)) {
      filters = [];
    }
    if (!paginator) {
      paginator = PaginatorTypeImp.empty();
    }
    if (!order) {
      order = OrderTypeImp.empty();
    }
    const items = await this.firestore.findAll(
      this._collection,
      filters.filter((e) => e.value),
      paginator,
      order,
    );
    return items.map((item) => {
      return ProductDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: ProductId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
