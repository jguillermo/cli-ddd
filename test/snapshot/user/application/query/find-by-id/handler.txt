import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserResponse } from '../user.response';
import { UserId } from '../../domain/user-id';
import { UserFindByIdDto } from './user-find-by-id.dto';
import { UserFindByIdService } from './user-find-by-id.service';

@QueryHandler(UserFindByIdDto)
export class UserFindByIdHandler implements IQueryHandler<UserFindByIdDto> {
  constructor(private service: UserFindByIdService) {}

  async execute(dto: UserFindByIdDto): Promise<UserResponse> {
    const id = new UserId(dto.id);

    return await this.service.execute(id);
  }
}
