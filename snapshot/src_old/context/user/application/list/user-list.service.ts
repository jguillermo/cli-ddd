import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserResponse } from '../user.response';
import { UserListResponse } from '../user-list.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { UserListDto } from './user-list.dto';

@Injectable()
export class UserListService {
  constructor(private repository: UserRepository) {}

  public async execute(dto: UserListDto, paginator: PaginatorTypeImp, order: OrderTypeImp): Promise<UserListResponse> {
    const listUser = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.id,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.name,
        },
      ],
      paginator,
      order,
    );
    return new UserListResponse(
      listUser.map((user) => {
        return UserResponse.fromAggregate(user);
      }),
    );
  }
}
