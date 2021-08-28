import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductUpdatedEvent } from '../../domain/product-updated.event';

@EventsHandler(ProductUpdatedEvent)
export class ResourceOnProductUpdated implements IEventHandler<ProductUpdatedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: ProductUpdatedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
