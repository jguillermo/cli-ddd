import { Injectable } from '@nestjs/common';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { UserRepository } from '../../domain/user.repository';
import { ListUserResponse } from '../list-user.response';
import { UserResponse } from '../user.response';

@Injectable()
export class UserListService {
  constructor(private repository: UserRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListUserResponse> {
    const listUser = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: name.value,
        },
      ],
      paginator,
      order,
    );
    return new ListUserResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
