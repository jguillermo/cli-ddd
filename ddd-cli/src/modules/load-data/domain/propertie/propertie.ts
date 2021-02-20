import { PropertieName } from './propertieName';
import { PropertieParam } from './propertieParam';

export class Propertie {
  constructor(private _name: PropertieName, private _params: PropertieParam[]) {}

  static create(properties): Propertie[] {
    return Object.entries(properties).map(([key, value]) => {
      return new Propertie(new PropertieName(key), PropertieParam.create(value));
    });
  }

  get name(): PropertieName {
    return this._name;
  }

  get params(): PropertieParam[] {
    return this._params;
  }
}