import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductCreatedEvent } from '../../domain/event/product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ResourceOnProductCreated implements IEventHandler<ProductCreatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: ProductCreatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
