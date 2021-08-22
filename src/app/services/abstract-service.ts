import { Language, LanguageInterface } from '../languages/language';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';

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

export interface GenerateResourcesData {
  aggregate: Aggregate;
  classAggregate: string;
  fileAggregate: string;
  classFirestoreRepository: string;
  fileFirestoreRepository: string;
  classResolver: string;
  fileResolver: string;
  propertieAggregate: string;
  classRepository: string;
  fileRepository: string;
  propertieRepository: string;
  classObjectMother: string;
  fileObjectMother: string;
  classE2eModule: string;
  classModule: string;
  fileModule: string;
}

export abstract class AbstractServiceResponse {
  constructor(protected _collectionAggregate: CollectionAggregate, protected language: LanguageInterface) {}

  abstract get templatePath(): string;

  abstract execute(aggregateName: string, options: any): void | Promise<void>;

  protected resources(aggregate: Aggregate): GenerateResourcesData {
    return {
      aggregate,
      classAggregate: this.language.className([aggregate.name.value]),
      fileAggregate: this.language.classFileWithOutType([aggregate.name.value], false),
      classFirestoreRepository: this.language.className([aggregate.name.value, 'firestore', 'repository']),
      fileFirestoreRepository: this.language.classFile([aggregate.name.value, 'firestore', 'repository'], false),
      classResolver: this.language.className([aggregate.name.value, 'Resolver']),
      fileResolver: this.language.classFile([aggregate.name.value, 'Resolver'], false),
      propertieAggregate: aggregate.name.propertie,
      classRepository: this.language.className([aggregate.name.value, 'Repository']),
      fileRepository: this.language.classFile([aggregate.name.value, 'Repository'], false),
      propertieRepository: `${aggregate.name.propertie}Repository`,
      classObjectMother: this.language.className([aggregate.name.value, 'mother']),
      fileObjectMother: this.language.classFileWithOutType([aggregate.name.value, 'object', 'mother'], false),
      classE2eModule: this.language.className([aggregate.name.value, 'E2eModule']),
      classModule: this.language.className([aggregate.name.value, 'module']),
      fileModule: this.language.classFile([aggregate.name.value, 'module'], false),
    };
  }
}
