import { Product } from '../../domain/product';
import { ProductId } from '../../domain/product-id';
import { ProductName } from '../../domain/product-name';
import { ProductCode } from '../../domain/product-code';
import { ProductDescription } from '../../domain/product-description';
import { ProductCreateAt } from '../../domain/product-create-at';
import { ProductPrice } from '../../domain/product-price';
import { ProductCategory } from '../../domain/product-category';
import { ItemDto } from '../../../share/infrastructure/firestore/firestore.service';

export class ProductDao {
  id: string;
  name: string;
  code: string;
  description: string;
  createAt: Date;
  price: number;
  category: string;

  static fromAggregate(product: Product): ProductDao {
    const dao = new ProductDao();
    dao.id = product.id.value;
    dao.name = product.name.value;
    dao.code = product.code.value;
    dao.description = product.description.value;
    dao.createAt = product.createAt.value;
    dao.price = product.price.value;
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
      new ProductCategory(this.category),
    );
  }
}
