import { Propertie } from '../modules/load-data/domain/propertie/propertie';
import { CollectionAggregate } from '../modules/load-data/domain/CollectionAggregate';

interface StorageProperties {
  [index: string]: Propertie;
}

interface StorageInterface {
  [index: string]: any;
}

class WPropertie {
  constructor(private _propertie: Propertie, private _properties: StorageProperties = {}) {}

  get propertie(): Propertie {
    return this._propertie;
  }

  get primitive(): string {
    return this.getPrimitivePropertie(this._propertie.name.fullName).type.primitive;
  }

  get primitiveType(): string {
    return this.getPrimitivePropertie(this._propertie.name.fullName).type.primitiveType;
  }

  get primitiveTypeImp(): string {
    return this.getPrimitivePropertie(this._propertie.name.fullName).type.primitiveTypeImp;
  }

  get parentTypeImp(): string {
    return this.getPrimitivePropertie(this._propertie.name.fullName).type.parentTypeImp;
  }

  private getPrimitivePropertie(fullName): Propertie {
    const propertie: Propertie = this._properties[fullName];
    if (!propertie) {
      throw new Error(`propertie (${fullName}) not exit`);
    }
    if (propertie.type.isPrimitiveType) {
      return propertie;
    } else {
      return this.getPrimitivePropertie(propertie.type.value);
    }
  }
}

class InMemoryStorage {
  private static instance: InMemoryStorage;

  private constructor(private _storage: StorageInterface = {}, private _properties: StorageProperties = {}) {}

  public static getInstance(): InMemoryStorage {
    if (!InMemoryStorage.instance) {
      InMemoryStorage.instance = new InMemoryStorage();
    }
    return InMemoryStorage.instance;
  }

  get(key: string): any {
    return this._storage[key];
  }

  set(key: string, value: any) {
    this._storage[key] = value;
  }

  /**
   * change with getWProperties
   * @deprecated
   */
  getProperties(properties: string[]): Propertie[] {
    return properties.map((e) => {
      return this.getPropertie(e);
    });
  }

  /**
   * change with getWPropertie
   * @deprecated
   */
  getPropertie(fullName: string): Propertie {
    return this._properties[fullName];
  }

  getWProperties(properties: string[]): WPropertie[] {
    return properties.map((e) => {
      return new WPropertie(this.getPropertie(e), this._properties);
    });
  }

  getWPropertie(fullName: string): WPropertie {
    return new WPropertie(this.getPropertie(fullName), this._properties);
  }

  setPropertie(fullName: string, propertie: Propertie) {
    this._properties[fullName] = propertie;
  }

  setallPropertie(collectionAggregate: CollectionAggregate) {
    collectionAggregate.aggregates.forEach((aggregate) => {
      aggregate.properties.forEach((propertie) => {
        this.setPropertie(propertie.name.fullName, propertie);
      });
    });
  }
}

export const storage = InMemoryStorage.getInstance();
