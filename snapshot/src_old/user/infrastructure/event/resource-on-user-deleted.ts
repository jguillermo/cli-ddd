import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserDeletedEvent } from '../../domain/user-deleted.event';

@EventsHandler(UserDeletedEvent)
export class ResourceOnUserDeleted implements IEventHandler<UserDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
