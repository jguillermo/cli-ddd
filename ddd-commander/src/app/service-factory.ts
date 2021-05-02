import { YmlToJsonService } from '../modules/load-data/application/yml-to-json/yml-to-json.service';
import { ReadSkeletonDataService } from '../modules/load-data/application/read-skeleton-data/read-skeleton-data.service';
import { SelectAggregate } from './menu/select-aggregate';
import { MenuAggregate } from './menu/menu-aggregate';
import { GenerateFactory } from './menu/generate/generateFactory';
import { CollectionAggregate } from '../modules/load-data/domain/CollectionAggregate';

class ServiceFactory {
  private static instance: ServiceFactory;

  private readonly _ymlToJsonService: YmlToJsonService;
  private readonly _readSkeletonDataService: ReadSkeletonDataService;
  private readonly _menuSelectAggregate: SelectAggregate;
  private readonly _menuAggregate: MenuAggregate;
  private readonly _generateFactory: GenerateFactory;

  private constructor() {
    this._ymlToJsonService = new YmlToJsonService();
    this._readSkeletonDataService = new ReadSkeletonDataService();
    this._menuSelectAggregate = new SelectAggregate();
    this._menuAggregate = new MenuAggregate();
    this._generateFactory = new GenerateFactory();
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

  get generateFactory(): GenerateFactory {
    return this._generateFactory;
  }
}

export const factory = ServiceFactory.getInstance();
