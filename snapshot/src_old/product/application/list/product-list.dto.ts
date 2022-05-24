import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { BaseDto, OrderDto, PaginatorDto } from '../../../share/application/base.dto';

@ArgsType()
export class ProductListDto extends BaseDto {
  constructor() {
    super();
  }

  @IsOptional()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @Field({ nullable: true })
  code?: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @Field({ nullable: true })
  createAt?: string;

  @IsOptional()
  @Field({ nullable: true })
  price?: number;

  @IsOptional()
  @Field({ nullable: true })
  category?: string;

  @IsOptional()
  @Validate(DomainValidator, [PaginatorTypeImp])
  @Field(() => PaginatorDto, { nullable: true })
  paginator?: PaginatorDto;

  @IsOptional()
  @Validate(DomainValidator, [OrderTypeImp])
  @Field(() => OrderDto, { nullable: true })
  order?: OrderDto;
}
