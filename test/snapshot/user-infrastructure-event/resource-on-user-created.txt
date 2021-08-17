import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../../domain/user-created.event';

@EventsHandler(UserCreatedEvent)
export class ResourceOnUserCreated implements IEventHandler<UserCreatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: UserCreatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
