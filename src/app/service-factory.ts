import { YmlToJsonService } from '../modules/load-data/application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../modules/load-data/application/read-skeleton-data/read-skeleton-data.service';
import { SelectAggregate } from './menu/select-aggregate';
import { GeneralMenuServices } from './menu/general-menu-services';
import { CollectionAggregate } from '../modules/load-data/domain/CollectionAggregate';
import { AbstractService } from './services/abstract-service';

class ServiceFactory {
  private static instance: ServiceFactory;

  private readonly _ymlToJsonService: YmlToJsonService;
  private readonly _readSkeletonDataService: ReadSkeletonDataService;
  private readonly _menuSelectAggregate: SelectAggregate;
  private readonly _menuAggregate: GeneralMenuServices;

  private constructor() {
    this._ymlToJsonService = new YmlToJsonService();
    this._readSkeletonDataService = new ReadSkeletonDataService();
    this._menuSelectAggregate = new SelectAggregate();
    this._menuAggregate = new GeneralMenuServices();
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

  async menuAggregate(aggregate: string, services: AbstractService[]): Promise<string> {
    return await this._menuAggregate.execute(aggregate, services);
  }

  async generate(serviceSelected: string, aggregate: string, collectionAggregate: CollectionAggregate, services: AbstractService[]): Promise<void> {
    const service = services.find((value) => value.serviceName() === serviceSelected);
    service.setCollectionAggregate(collectionAggregate);
    await service.execute(aggregate);
  }
}

export const factory = ServiceFactory.getInstance();
