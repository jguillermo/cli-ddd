import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserUpdatedEvent } from '../../domain/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class ResourceOnUserUpdated implements IEventHandler<UserUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
