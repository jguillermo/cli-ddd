import { AbstractService } from '../abstract-service';
import { factory } from '../../service-factory';
import { menuServices } from './index';

export class MenuServices extends AbstractService {
  serviceName(): string {
    return 'Menu services';
  }

  async execute(aggregateName: string): Promise<void> {
    const serviceSelected = await factory.menuAggregate(aggregateName, menuServices);
    await factory.generate(serviceSelected, aggregateName, this._collectionAggregate, menuServices);
  }
}