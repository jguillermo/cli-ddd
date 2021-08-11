import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';
import { DomainValidator, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { BaseDto, OrderDto, PaginatorDto } from '../../../share/application/base.dto';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@ArgsType()
export class UserListDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UUIDTypeImp])
  @Field({ nullable: true })
  id?: string;

  @Validate(DomainValidator, [StringTypeImp])
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
