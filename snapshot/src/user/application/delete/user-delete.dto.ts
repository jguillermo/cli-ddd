import { Validate } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { DomainValidator } from 'base-ddd';
import { BaseDto } from '../../../share/application/base.dto';
import { UserId } from '../../domain/user-id';

@ArgsType()
export class UserDeleteDto extends BaseDto {
  constructor() {
    super();
  }

  @Validate(DomainValidator, [UserId])
  @Field()
  id: string;
}
