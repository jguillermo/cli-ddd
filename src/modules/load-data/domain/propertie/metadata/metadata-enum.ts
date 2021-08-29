import { Metadata } from './metadata';
import { PropertieValue } from './metadata-factory';

export class MetadataEnum extends Metadata {
  private readonly _values: string[];

  constructor(metadata: PropertieValue) {
    super(metadata);
    this._values = metadata.values;
  }

  get values(): string[] {
    return this._values;
  }
}
