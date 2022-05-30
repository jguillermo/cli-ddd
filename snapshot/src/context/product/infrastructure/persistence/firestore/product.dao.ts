import { Product } from '../../../domain/aggregate/product';
import { ProductId } from '../../../domain/aggregate/product-id';
import { ProductName } from '../../../domain/aggregate/product-name';
import { ProductCode } from '../../../domain/aggregate/product-code';
import { ProductDescription } from '../../../domain/aggregate/product-description';
import { ProductCreateAt } from '../../../domain/aggregate/product-create-at';
import { ProductPrice } from '../../../domain/aggregate/product-price';
import { ProductIsActive } from '../../../domain/aggregate/product-is-active';
import { ProductCategory } from '../../../domain/aggregate/product-category';
import { ItemDto } from '../../../../share/infrastructure/firestore/firestore.service';

export class ProductDao {
  id: string;
  name: string;
  code: string;
  description: string;
  createAt: Date;
  price: number;
  isActive: boolean;
  category: string;

  static fromAggregate(product: Product): ProductDao {
    const dao = new ProductDao();
    dao.id = product.id.value;
    dao.name = product.name.value;
    dao.code = product.code.value;
    dao.description = product.description.value;
    dao.createAt = product.createAt.value;
    dao.price = product.price.value;
    dao.isActive = product.isActive.value;
    dao.category = product.category.value;
    return dao;
  }

  static fromItem(item: ItemDto): ProductDao {
    const dao = new ProductDao();
    //item.data.id = item.id
    dao.id = item.data.id;
    dao.name = item.data.name;
    dao.code = item.data.code;
    dao.description = item.data.description;
    dao.createAt = item.data.createAt.toDate();
    dao.price = item.data.price;
    dao.isActive = item.data.isActive;
    dao.category = item.data.category;
    return dao;
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      description: this.description,
      createAt: this.createAt,
      price: this.price,
      isActive: this.isActive,
      category: this.category,
    };
  }

  toAggregate(): Product {
    return new Product(
      new ProductId(this.id),
      new ProductName(this.name),
      new ProductCode(this.code),
      new ProductDescription(this.description),
      new ProductCreateAt(this.createAt),
      new ProductPrice(this.price),
      new ProductIsActive(this.isActive),
      new ProductCategory(this.category),
    );
  }
}
