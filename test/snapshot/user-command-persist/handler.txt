import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserPersistService } from './user-persist.service';
import { UserPersistDto } from './user-persist.dto';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@CommandHandler(UserPersistDto)
export class UserPersistHandler implements ICommandHandler<UserPersistDto> {
  constructor(private service: UserPersistService) {}

  async execute(dto: UserPersistDto): Promise<void> {
    const id = new UserId(dto.id);
    const name = new UserName(dto.name);

    await this.service.execute(id, name);
  }
}
