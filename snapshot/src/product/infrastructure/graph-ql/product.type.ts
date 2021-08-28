import { createUnionType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';
import { EnumProductCategory } from '../../domain/product-category';

@ObjectType('Product')
export class ProductType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  description: string;

  @Field()
  createAt: Date;

  @Field()
  price: number;

  @Field(() => EnumProductCategory)
  category: EnumProductCategory;
}

export const ResultProductPersist = createUnionType({
  name: 'ResultProductPersist',
  types: () => [ProductType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return ProductType;
  },
});

registerEnumType(EnumProductCategory, {
  name: 'ProductCategory',
});
