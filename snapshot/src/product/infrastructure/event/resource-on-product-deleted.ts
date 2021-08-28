import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductDeletedEvent } from '../../domain/product-deleted.event';

@EventsHandler(ProductDeletedEvent)
export class ResourceOnProductDeleted implements IEventHandler<ProductDeletedEvent> {
  //constructor(private commandBus: CommandBus) {}

  handle(event: ProductDeletedEvent) {
    // logic
    Logger.log(event.eventName());
  }
}
