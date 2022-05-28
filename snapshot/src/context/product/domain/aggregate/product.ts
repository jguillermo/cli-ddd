import { AggregateRoot } from 'base-ddd';
import { ProductId } from './product-id';
import { ProductName } from './product-name';
import { ProductCode } from './product-code';
import { ProductDescription } from './product-description';
import { ProductCreateAt } from './product-create-at';
import { ProductPrice } from './product-price';
import { ProductCategory } from './product-category';
import { ProductCreatedEvent } from '../event/product-created.event';
import { ProductUpdatedEvent } from '../event/product-updated.event';
import { ProductDeletedEvent } from '../event/product-deleted.event';

export class Product extends AggregateRoot {
  constructor(
    private _id: ProductId,
    private _name: ProductName,
    private _code: ProductCode,
    private _description: ProductDescription,
    private _createAt: ProductCreateAt,
    private _price: ProductPrice,
    private _category: ProductCategory,
  ) {
    super();
  }

  static create(
    id: ProductId,
    name: ProductName,
    code: ProductCode,
    description: ProductDescription,
    createAt: ProductCreateAt,
    price: ProductPrice,
    category: ProductCategory,
  ): Product {
    const product = new Product(id, name, code, description, createAt, price, category);
    product.record(
      new ProductCreatedEvent(
        id.value,
        name.value,
        code.value,
        description.value,
        createAt.toString,
        price.value,
        category.value,
      ),
    );
    return product;
  }

  get id(): ProductId {
    return this._id;
  }

  get name(): ProductName {
    return this._name;
  }

  get code(): ProductCode {
    return this._code;
  }

  get description(): ProductDescription {
    return this._description;
  }

  get createAt(): ProductCreateAt {
    return this._createAt;
  }

  get price(): ProductPrice {
    return this._price;
  }

  get category(): ProductCategory {
    return this._category;
  }

  update(
    name: ProductName,
    code: ProductCode,
    description: ProductDescription,
    createAt: ProductCreateAt,
    price: ProductPrice,
    category: ProductCategory,
  ): void {
    this._name = name;
    this._code = code;
    this._description = description;
    this._createAt = createAt;
    this._price = price;
    this._category = category;
    this.record(
      new ProductUpdatedEvent(
        this.id.value,
        this.name.value,
        this.code.value,
        this.description.value,
        this.createAt.toString,
        this.price.value,
        this.category.value,
      ),
    );
  }

  delete(): void {
    this.record(
      new ProductDeletedEvent(
        this.id.value,
        this.name.value,
        this.code.value,
        this.description.value,
        this.createAt.toString,
        this.price.value,
        this.category.value,
      ),
    );
  }
}
