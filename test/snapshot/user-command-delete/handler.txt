import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDeleteService } from './user-delete.service';
import { UserDeleteDto } from './user-delete.dto';
import { UserId } from '../../domain/user-id';

@CommandHandler(UserDeleteDto)
export class UserDeleteHandler implements ICommandHandler<UserDeleteDto> {
  constructor(private service: UserDeleteService) {}

  async execute(dto: UserDeleteDto): Promise<void> {
    const id = new UserId(dto.id);

    await this.service.execute(id);
  }
}
