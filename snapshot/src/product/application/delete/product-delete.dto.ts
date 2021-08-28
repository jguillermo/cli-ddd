import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { ProductId } from '../../domain/product-id';

@ArgsType()
export class ProductDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [ProductId])
  @Field()
  id: string;
}
