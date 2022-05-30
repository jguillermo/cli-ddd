import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { ProductId } from '../../domain/aggregate/product-id';
import { ProductName } from '../../domain/aggregate/product-name';
import { ProductCode } from '../../domain/aggregate/product-code';
import { ProductDescription } from '../../domain/aggregate/product-description';
import { ProductCreateAt } from '../../domain/aggregate/product-create-at';
import { ProductPrice } from '../../domain/aggregate/product-price';
import { ProductIsActive } from '../../domain/aggregate/product-is-active';
import { ProductCategory } from '../../domain/aggregate/product-category';

@ArgsType()
export class ProductPersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [ProductId])
  @Field()
  id: string;

  @Validate(DomainValidator, [ProductName])
  @Field()
  name: string;

  @Validate(DomainValidator, [ProductCode])
  @Field()
  code: string;

  @Validate(DomainValidator, [ProductDescription])
  @Field()
  description: string;

  @Validate(DomainValidator, [ProductCreateAt])
  @Field()
  createAt: string;

  @Validate(DomainValidator, [ProductPrice])
  @Field()
  price: number;

  @Validate(DomainValidator, [ProductIsActive])
  @Field()
  isActive: boolean;

  @Validate(DomainValidator, [ProductCategory])
  @Field()
  category: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
