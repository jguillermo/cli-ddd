import { faker } from '@faker-js/faker';
import { User } from '../../../../src/context/user/domain/aggregate/user';
import { UserId } from '../../../../src/context/user/domain/aggregate/user-id';
import { UserName } from '../../../../src/context/user/domain/aggregate/user-name';

export interface UserDataInterface {
  id?: string;
  name?: string;
}

export class UserIdMother {
  static create(value?: string): UserId {
    const id = value ? value : faker.datatype.uuid();
    return new UserId(id);
  }
}

export class UserNameMother {
  static create(value?: string): UserName {
    const name = value ? value : faker.name.firstName();
    return new UserName(name);
  }
}

export class UserMother {
  static create(data?: UserDataInterface): User {
    return new User(UserIdMother.create(data?.id), UserNameMother.create(data?.name));
  }
}
