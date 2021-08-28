import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { ProductId } from '../../domain/product-id';
import { ProductName } from '../../domain/product-name';
import { ProductCode } from '../../domain/product-code';
import { ProductDescription } from '../../domain/product-description';
import { ProductCreateAt } from '../../domain/product-create-at';
import { ProductPrice } from '../../domain/product-price';
import { ProductCategory } from '../../domain/product-category';

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

  @Validate(DomainValidator, [ProductCategory])
  @Field()
  category: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
