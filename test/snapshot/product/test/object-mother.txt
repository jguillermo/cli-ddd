import * as faker from 'faker';
import { Product } from '../../src/product/domain/product';
import { ProductId } from '../../src/product/domain/product-id';
import { ProductName } from '../../src/product/domain/product-name';
import { ProductCode } from '../../src/product/domain/product-code';
import { ProductDescription } from '../../src/product/domain/product-description';
import { ProductCreateAt } from '../../src/product/domain/product-create-at';
import { ProductPrice } from '../../src/product/domain/product-price';
import { EnumProductCategory, ProductCategory } from '../../src/product/domain/product-category';

export interface ProductDataInterface {
  id?: string;
  name?: string;
  code?: string;
  description?: string;
  createAt?: Date;
  price?: number;
  category?: string;
}

export class ProductIdMother {
  static create(value?: string): ProductId {
    const id = value ? value : faker.datatype.uuid();
    return new ProductId(id);
  }
}

export class ProductNameMother {
  static create(value?: string): ProductName {
    const name = value ? value : faker.name.firstName();
    return new ProductName(name);
  }
}

export class ProductCodeMother {
  static create(value?: string): ProductCode {
    const code = value ? value : faker.datatype.uuid();
    return new ProductCode(code);
  }
}

export class ProductDescriptionMother {
  static create(value?: string): ProductDescription {
    const description = value ? value : faker.random.word();
    return new ProductDescription(description);
  }
}

export class ProductCreateAtMother {
  static create(value?: Date): ProductCreateAt {
    const createAt = value ? value : faker.datatype.datetime().toISOString();
    return new ProductCreateAt(createAt);
  }
}

export class ProductPriceMother {
  static create(value?: number): ProductPrice {
    const price = value ? value : faker.datatype.number();
    return new ProductPrice(price);
  }
}

export class ProductCategoryMother {
  static create(value?: string): ProductCategory {
    const category = value
      ? value
      : faker.random.arrayElement(Object.keys(EnumProductCategory).map((e) => EnumProductCategory[e]));
    return new ProductCategory(category);
  }
}

export class ProductMother {
  static create(data?: ProductDataInterface): Product {
    return new Product(
      ProductIdMother.create(data?.id),
      ProductNameMother.create(data?.name),
      ProductCodeMother.create(data?.code),
      ProductDescriptionMother.create(data?.description),
      ProductCreateAtMother.create(data?.createAt),
      ProductPriceMother.create(data?.price),
      ProductCategoryMother.create(data?.category),
    );
  }
}
