import { PropertieName } from './propertieName';
import { PropertieType } from './propertieType';
import { PropertieRequired } from './propertieRequired';
import { PropertieDefault } from './propertieDefault';
import { Name } from '../Name';
import { MetadataFactory } from './metadata/metadata-factory';
import { Metadata } from './metadata/metadata';
import { MetadataEnum } from './metadata/metadata-enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Propertie {
  constructor(
    private _name: PropertieName,
    private _type: PropertieType,
    private _required: PropertieRequired,
    private _defaultValue: PropertieDefault,
    private _aggregateName: Name,
    private _metadata: Metadata,
  ) {}

  static create(propertieName: string, value: any, aggregateName: Name): Propertie {
    const metadata = MetadataFactory.create(value);

    return new Propertie(
      new PropertieName(propertieName, aggregateName.value),
      new PropertieType(metadata.type),
      new PropertieRequired(metadata.required),
      new PropertieDefault(metadata.defaultValue),
      aggregateName,
      metadata,
    );
  }

  get metadata(): Metadata {
    return this._metadata;
  }

  get metadataEnum(): MetadataEnum {
    return <MetadataEnum>this._metadata;
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
