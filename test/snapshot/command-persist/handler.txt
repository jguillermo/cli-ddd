import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserPersistDao } from './user-persist.dao';
import { UserPersistService } from './user-persist.service';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';

@CommandHandler(UserPersistDao)
export class UserPersistHandler implements ICommandHandler<UserPersistDao> {
  constructor(private service: UserPersistService) {}

  async execute(dao: UserPersistDao): Promise<void> {
    const id = new UserId(dao.id);
    const name = new UserName(dao.name);

    await this.service.execute(id, name);
  }
}
