import { YmlToJsonService } from '../modules/load-data/application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../modules/load-data/application/read-skeleton-data/read-skeleton-data.service';
import { SelectAggregate } from './menu/select-aggregate';
import { MenuAggregate } from './menu/menu-aggregate';
import { CollectionAggregate } from '../modules/load-data/domain/CollectionAggregate';
import { storage } from './in-memory-storage';

class ServiceFactory {
  private static instance: ServiceFactory;

  private readonly _ymlToJsonService: YmlToJsonService;
  private readonly _readSkeletonDataService: ReadSkeletonDataService;
  private readonly _menuSelectAggregate: SelectAggregate;
  private readonly _menuAggregate: MenuAggregate;

  private constructor() {
    this._ymlToJsonService = new YmlToJsonService();
    this._readSkeletonDataService = new ReadSkeletonDataService();
    this._menuSelectAggregate = new SelectAggregate();
    this._menuAggregate = new MenuAggregate();
  }

  public static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  get ymlToJsonService(): YmlToJsonService {
    return this._ymlToJsonService;
  }

  get readSkeletonDataService(): ReadSkeletonDataService {
    return this._readSkeletonDataService;
  }

  async menuSelectAggregate(aggregates: CollectionAggregate): Promise<string> {
    return await this._menuSelectAggregate.execute(aggregates);
  }

  async menuAggregate(aggregate: string): Promise<string> {
    return await this._menuAggregate.execute(aggregate);
  }

  async generate(service: string, aggregate: string, collectionAggregate: CollectionAggregate): Promise<void> {
    let generate;
    storage.get('services').forEach(function (item) {
      if (item.serviceName() === service) {
        generate = item;
      }
    });
    await generate.execute(aggregate, collectionAggregate);
  }
}

export const factory = ServiceFactory.getInstance();
