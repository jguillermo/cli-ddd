import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '../../domain/user-id';
import { UserName } from '../../domain/user-name';
import { User } from '../../domain/user';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UserPersistService {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}

  public async execute(id: UserId, name: UserName): Promise<void> {
    let user = await this.repository.findById(id);
    if (!user) {
      user = User.create(id, name);
    } else {
      user.change(name);
    }
    await this.repository.persist(user);
    this.eventBus.publishAll(user.pullDomainEvents());
  }
}
