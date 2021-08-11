import { PropertieName } from './propertieName';
import { PropertieType } from './propertieType';
import { PropertieRequired } from './propertieRequired';
import { PropertieDefault } from './propertieDefault';
import { Name } from '../Name';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

interface PropertieValue {
  required: boolean;
  defaultValue: string | boolean | number;
  type: string;
}

export class Propertie {
  constructor(private _name: PropertieName, private _type: PropertieType, private _required: PropertieRequired, private _defaultValue: PropertieDefault, private _aggregateName: Name) {}

  static create(propertieName: string, value: any, aggregateName: Name): Propertie {
    const { type, required, defaultValue } = this.processValue(value);
    return new Propertie(new PropertieName(propertieName, aggregateName.value), new PropertieType(type), new PropertieRequired(required), new PropertieDefault(defaultValue), aggregateName);
  }

  private static processValue(value): PropertieValue {
    let type: string;
    let required: boolean;
    let defaultValue: any;
    if (typeof value === 'string') {
      type = value;
      defaultValue = null;
      required = true;
    } else {
      type = value['type'];
      required = typeof value['required'] == 'undefined' ? true : value['required'];
      defaultValue = typeof value['default'] == 'undefined' ? null : value['default'];
    }
    return {
      type,
      required,
      defaultValue,
    };
  }

  get aggregateName(): Name {
    return this._aggregateName;
  }

  get name(): PropertieName {
    return this._name;
  }

  get className(): string {
    return `${this._aggregateName.value}${s.capitalize(this._name.value)}`;
  }

  get type(): PropertieType {
    return this._type;
  }

  get required(): PropertieRequired {
    return this._required;
  }

  get defaultValue(): PropertieDefault {
    return this._defaultValue;
  }

  get json() {
    return {
      fullName: this.name.fullName,
      name: this.name.value,
      type: this.type.value,
      required: this.required.value,
      defaultValue: this.defaultValue.value,
    };
  }
}
