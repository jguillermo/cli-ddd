import { Validate, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@ArgsType()
export class UserPersistDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;

  @Validate(DomainValidator, [UserName])
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true, defaultValue: false })
  showEntity?: boolean;
}
