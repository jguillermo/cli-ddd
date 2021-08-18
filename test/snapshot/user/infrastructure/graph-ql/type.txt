import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { StatusType } from '../../../share/app/status.type';

@ObjectType('User')
export class UserType {
  @Field()
  id: string;

  @Field()
  name: string;
}

export const ResultUserPersist = createUnionType({
  name: 'ResultUserPersist',
  types: () => [UserType, StatusType],
  resolveType(value) {
    if (value.status) {
      return StatusType;
    }
    return UserType;
  },
});
