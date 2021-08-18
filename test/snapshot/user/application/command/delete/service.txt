import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '../../domain/user-id';

@Injectable()
export class UserDeleteService {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}

  public async execute(id: UserId): Promise<void> {
    const user = await this.repository.findById(id);
    if (user) {
      user.delete();
      await this.repository.deleteById(user.id);
      this.eventBus.publishAll(user.pullDomainEvents());
    }
  }
}
