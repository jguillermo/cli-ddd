import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { Product } from './aggregate/product';
import { ProductId } from './aggregate/product-id';

export abstract class ProductRepository {
  abstract persist(product: Product): Promise<void>;

  abstract findById(id: ProductId): Promise<Product | null>;

  abstract findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<Product[]>;

  abstract deleteById(id: ProductId): Promise<void>;
}
