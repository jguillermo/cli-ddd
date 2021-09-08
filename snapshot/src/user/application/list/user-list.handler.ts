import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListUserResponse } from '../list-user.response';
import { UserListDto } from './user-list.dto';
import { UserListService } from './user-list.service';

@QueryHandler(UserListDto)
export class UserListHandler implements IQueryHandler<UserListDto> {
  constructor(private service: UserListService) {}

  async execute(dto: UserListDto): Promise<ListUserResponse> {
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);
    return await this.service.execute(dto, paginator, order);
  }
}
