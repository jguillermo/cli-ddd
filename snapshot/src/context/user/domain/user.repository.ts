import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { User } from './aggregate/user';
import { UserId } from './aggregate/user-id';

export abstract class UserRepository {
  abstract persist(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<User | null>;

  abstract findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<User[]>;

  abstract deleteById(id: UserId): Promise<void>;
}
