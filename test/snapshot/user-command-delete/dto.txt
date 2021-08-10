import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { UserId } from '../../domain/user-id';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';

@ArgsType()
export class UserDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;
}
