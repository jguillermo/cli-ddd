import { AbstractService } from '../abstract-service';
import { factory } from '../../service-factory';
import { menuServices } from './index';

export class MenuApp extends AbstractService {
  serviceName(): string {
    return 'Menu app';
  }

  async execute(aggregateName: string): Promise<void> {
    const serviceSelected = await factory.menuAggregate(aggregateName, menuServices);
    await factory.generate(serviceSelected, aggregateName, this._collectionAggregate, menuServices);
  }
}
