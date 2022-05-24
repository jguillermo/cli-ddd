import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { BaseDto, OrderDto, PaginatorDto } from '../../../share/application/base.dto';

@ArgsType()
export class UserListDto extends BaseDto {
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
  @Validate(DomainValidator, [PaginatorTypeImp])
  @Field(() => PaginatorDto, { nullable: true })
  paginator?: PaginatorDto;

  @IsOptional()
  @Validate(DomainValidator, [OrderTypeImp])
  @Field(() => OrderDto, { nullable: true })
  order?: OrderDto;
}
