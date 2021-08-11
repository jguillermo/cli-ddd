import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UserListDto } from './user-list.dto';
import { UserListService } from './user-list.service';
import { ListUserResponse } from '../list-user.response';

@QueryHandler(UserListDto)
export class UserListHandler implements IQueryHandler<UserListDto> {
  constructor(private service: UserListService) {}

  async execute(dto: UserListDto): Promise<ListUserResponse> {
    const id = new UUIDTypeImp(dto.id);
    const name = new StringTypeImp(dto.name);
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);

    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, name, paginator, order);
  }
}
