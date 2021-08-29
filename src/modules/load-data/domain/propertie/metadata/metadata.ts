import { PropertieValue } from './metadata-factory';

export class Metadata {
  private readonly _type: string;
  private readonly _required: boolean;
  private readonly _defaultValue: any;

  constructor(metadata: PropertieValue) {
    this._type = metadata.type;
    this._required = metadata.required;
    this._defaultValue = metadata.defaultValue;
  }

  get type(): string {
    return this._type;
  }

  get required(): boolean {
    return this._required;
  }

  get defaultValue(): any {
    return this._defaultValue;
  }
}
