import { Language, LanguageInterface } from '../languages/language';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';

export abstract class AbstractService {
  protected language: LanguageInterface = null;
  protected _collectionAggregate: CollectionAggregate = null;

  constructor() {
    this.language = Language.plugin('node');
  }

  abstract serviceName(): string;

  abstract execute(aggregate: string): void | Promise<void>;

  setCollectionAggregate(collectionAggregate: CollectionAggregate) {
    this._collectionAggregate = collectionAggregate;
  }
}

export abstract class AbstractServiceResponse {
  constructor(protected _collectionAggregate: CollectionAggregate, protected language: LanguageInterface) {}

  abstract get templatePath(): string;

  abstract execute(aggregateName: string, options: any): void | Promise<void>;
}
