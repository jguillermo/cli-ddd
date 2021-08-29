import { Injectable } from '@nestjs/common';
import { FilterItem, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user-id';
import { UserDao } from './user.dao';
import { UserRepository } from '../../domain/user.repository';
import { FirestoreService } from '../../../share/infrastructure/firestore/firestore.service';

@Injectable()
export class UserFirestoreRepository extends UserRepository {
  private _collection = 'users';

  constructor(private readonly firestore: FirestoreService) {
    super();
  }

  async persist(user: User): Promise<void> {
    const dao = UserDao.fromAggregate(user);
    await this.firestore.persist(this._collection, dao.id, dao.data);
  }

  async findById(id: UserId): Promise<User | null> {
    const item = await this.firestore.findOneDocumentById(this._collection, id.value);
    if (!item) {
      return null;
    }
    return UserDao.fromItem(item).toAggregate();
  }

  async findAll(filters?: Array<FilterItem>, paginator?: PaginatorTypeImp, order?: OrderTypeImp): Promise<User[]> {
    if (!Array.isArray(filters)) {
      filters = [];
    }
    if (!paginator) {
      paginator = PaginatorTypeImp.empty();
    }
    if (!order) {
      order = OrderTypeImp.empty();
    }
    const items = await this.firestore.findAll(
      this._collection,
      filters.filter((e) => e.value),
      paginator,
      order,
    );
    return items.map((item) => {
      return UserDao.fromItem(item).toAggregate();
    });
  }

  async deleteById(id: UserId): Promise<void> {
    await this.firestore.delete(this._collection, id.value);
  }
}
